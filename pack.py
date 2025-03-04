import os
import sys
import zipfile
import hashlib
from datetime import datetime
from pathlib import Path

class ModpackPackager:
    def __init__(self):
        self.config = {
            'client': {
                'pack_name': 'Leisurely Life 1.20.1',
                'output_dir': Path('builds'),
                'required_files': ['manifest.json', 'modlist.html'],
                'required_dirs': ['overrides']
            },
            'server': {
                'pack_name': 'Leisurely Life Server 1.20.1',
                'server_root': Path('.server'),
                'output_dir': Path('builds'),
                'required_files': ['server.properties'],
                'required_dirs': [],
                'exclude_mods': [
                    'jei-1.20.1-fabric.jar',  # 举例排除客户端模组
                    'journeymap-1.20.1.jar'
                ]
            }
        }

    def _validate_assets(self, asset_type):
        """通用验证方法"""
        config = self.config[asset_type]
        missing = []
        root = config.get('server_root', Path('.'))  # 客户端使用当前目录

        # 检查文件
        for f in config['required_files']:
            if not (root / f).exists():
                missing.append(f"{asset_type}文件缺失: {f}")

        # 检查目录
        for d in config['required_dirs']:
            if not (root / d).is_dir():
                missing.append(f"{asset_type}目录缺失: {d}")

        if missing:
            raise FileNotFoundError("\n".join(missing))

    def _package_asset(self, asset_type):
        """通用打包逻辑"""
        try:
            self._validate_assets(asset_type)
            config = self.config[asset_type]
            version = datetime.now().strftime("%Y.%m.%d")
            output_dir = config['output_dir']
            output_dir.mkdir(parents=True, exist_ok=True)

            zip_name = output_dir / f"{config['pack_name']}-{version}.zip"
            root = config.get('server_root', Path('.'))  # 客户端根目录

            with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
                # 添加必需文件
                for file in config['required_files']:
                    file_path = root / file
                    zipf.write(file_path, arcname=file)
                    print(f"添加{asset_type}文件: {file}")

                # 递归添加目录
                for dir_name in config['required_dirs']:
                    dir_path = root / dir_name
                    if dir_path.is_dir():
                        print(f"添加{asset_type}目录: {dir_name}")
                        for file_path in dir_path.rglob('*'):
                            if file_path.is_file():
                                # 服务端mod排除逻辑
                                if asset_type == 'server' and dir_name == 'mods':
                                    if any(exclude in file_path.name for exclude in config['exclude_mods']):
                                        print(f"排除服务端mod: {file_path.name}")
                                        continue
                                arcname = file_path.relative_to(root)
                                zipf.write(file_path, arcname=arcname)

            print(f"\n成功创建{asset_type}: {zip_name}")
            self._generate_checksum(zip_name)
            return 0
        except Exception as e:
            print(f"\n{asset_type}打包错误: {str(e)}")
            return 1

    def _generate_checksum(self, file_path):
        """生成校验文件"""
        algorithms = {
            'md5': hashlib.md5(),
            'sha1': hashlib.sha1()
        }

        with open(file_path, 'rb') as f:
            for chunk in iter(lambda: f.read(4096), b''):
                for algo in algorithms.values():
                    algo.update(chunk)

        for algo_name, algo in algorithms.items():
            checksum_file = f"{file_path}.{algo_name}"
            with open(checksum_file, 'w') as f:
                f.write(f"{algo.hexdigest()}  {file_path.name}")
            print(f"生成校验文件: {checksum_file}")

    def package_all(self):
        """打包所有"""
        client_code = self._package_asset('client')
        server_code = self._package_asset('server')
        return max(client_code, server_code)  # 任何一个失败则返回1

if __name__ == "__main__":
    packager = ModpackPackager()
    sys.exit(packager.package_all())
