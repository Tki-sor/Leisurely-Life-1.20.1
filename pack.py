import os
import sys
import zipfile
import hashlib
from datetime import datetime
from pathlib import Path

class ModpackPackager:
    def __init__(self):
        self.config = {
            'pack_name': 'Leisurely Life 1.20.1',
            'output_dir': Path('builds'),
            'required_files': ['manifest.json', 'modlist.html'],
            'required_dirs': ['overrides']
        }

    def validate_files(self):
        """验证必需文件是否存在"""
        missing = []
        
        # 检查文件
        for f in self.config['required_files']:
            if not Path(f).exists():
                missing.append(f"文件缺失: {f}")
        
        # 检查目录
        for d in self.config['required_dirs']:
            if not Path(d).is_dir():
                missing.append(f"目录缺失: {d}")
        
        if missing:
            raise FileNotFoundError("\n".join(missing))

    def generate_checksum(self, file_path):
        """生成MD5和SHA1校验文件"""
        hash_md5 = hashlib.md5()
        hash_sha1 = hashlib.sha1()

        with open(file_path, 'rb') as f:
            for chunk in iter(lambda: f.read(4096), b''):
                hash_md5.update(chunk)
                hash_sha1.update(chunk)

        checksums = {
            'md5': hash_md5.hexdigest(),
            'sha1': hash_sha1.hexdigest()
        }
        
        for algo, value in checksums.items():
            checksum_file = f"{file_path}.{algo}"
            with open(checksum_file, 'w') as f:
                f.write(f"{value}  {file_path.name}")
            
            print(f"生成校验文件: {checksum_file}")

    def package(self):
        try:
            self.validate_files()
            
            version = datetime.now().strftime("%Y.%m.%d")
            self.config['output_dir'].mkdir(parents=True, exist_ok=True)
            
            zip_name = self.config['output_dir'] / f"{self.config['pack_name']}-{version}.zip"

            with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
                # 添加清单文件
                for file in self.config['required_files']:
                    zipf.write(file)
                    print(f"添加文件: {file}")

                # 递归添加overrides目录
                print("添加overrides文件夹")
                for root, _, files in os.walk('overrides'):
                    for file in files:
                        path = Path(root) / file
                        arcname = path.relative_to('overrides')
                        zipf.write(path, arcname=Path('overrides') / arcname)
                        # print(f"添加目录文件: {path}")

            print(f"\n成功创建压缩包: {zip_name}")
            
            # 生成校验文件
            self.generate_checksum(zip_name)

            return 0
        except Exception as e:
            print(f"\n错误发生: {str(e)}")
            return 1

if __name__ == "__main__":
    packager = ModpackPackager()
    sys.exit(packager.package())
