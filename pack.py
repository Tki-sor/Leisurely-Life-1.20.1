import os
import sys
import zipfile
import hashlib
import re
from datetime import datetime
from pathlib import Path

class ModpackPackager:
    def __init__(self):
        self.config = {
            'client': {
                'pack_name': 'Leisurely Life 1.20.1',
                'source_dir': Path('.'),
                'output_dir': Path('builds'),
                'required_files': ['manifest.json', 'modlist.html'],
                'include_dirs': ['overrides']
            },
            'server': {
                'pack_name': 'Leisurely Life Server 1.20.1',
                'source_dir': Path('.server'),
                'output_dir': Path('builds'),
                # 排除规则配置
                'exclude': {
                    'patterns': [
                        're:.*\.bak',            # 正则匹配备份文件
                        'ClientOnlyMod*.jar',    # 通配符匹配
                        'config/secret.cfg'      # 全路径匹配
                    ],
                    'mods_patterns': [          # mods目录专用排除规则
                        're:.*-Forge-.*\.jar',
                        'JourneyMap-*.jar'
                    ]
                }
            }
        }

    def _should_exclude(self, relative_path, patterns):
        """判断是否应该排除文件"""
        path_str = str(relative_path)
        name = relative_path.name
        
        for pattern in patterns:
            try:
                # 正则表达式匹配
                if pattern.startswith('re:'):
                    regex = pattern[3:]
                    if re.fullmatch(regex, path_str) or re.fullmatch(regex, name):
                        return True
                
                # 通配符匹配（匹配路径或文件名）
                elif '*' in pattern:
                    # 转换为正则表达式
                    regex = re.escape(pattern).replace(r'\*', '.*') + '$'
                    if re.match(regex, path_str) or re.match(regex, name):
                        return True
                
                # 完整路径匹配
                else:
                    if path_str == pattern:
                        return True
            except re.error:
                print(f"警告：无效的正则表达式模式 '{pattern}'")
                continue
        return False

    def _package_server(self):
        """打包服务端专用方法"""
        config = self.config['server']
        try:
            if not config['source_dir'].exists():
                raise FileNotFoundError(f"服务端目录不存在: {config['source_dir']}")

            version = datetime.now().strftime("%Y.%m.%d")
            output_file = config['output_dir'] / f"{config['pack_name']}-{version}.zip"
            output_file.parent.mkdir(parents=True, exist_ok=True)

            exclude_patterns = config['exclude']['patterns']
            mods_exclude = config['exclude']['mods_patterns']

            with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for file_path in config['source_dir'].rglob('*'):
                    if not file_path.is_file():
                        continue

                    relative_path = file_path.relative_to(config['source_dir'])
                    
                    # 合并通用排除规则和mods专用排除规则
                    all_excludes = exclude_patterns.copy()
                    if relative_path.parts[0] == 'mods':
                        all_excludes += mods_exclude

                    if self._should_exclude(relative_path, all_excludes):
                        print(f"[-] 排除文件: {relative_path}")
                        continue

                    zipf.write(file_path, arcname=relative_path)
                    print(f"[+] 添加文件: {relative_path}")

            print(f"\n✅ 服务端打包完成: {output_file}")
            self._generate_checksum(output_file)
            return 0
        except Exception as e:
            print(f"\n❌ 服务端打包失败: {str(e)}")
            return 1

    def _package_client(self):
        """打包客户端"""
        config = self.config['client']
        try:
            # 验证必要文件
            missing = []
            for f in config['required_files'] + config['include_dirs']:
                path = config['source_dir'] / f
                if not path.exists():
                    missing.append(str(path))
            if missing:
                raise FileNotFoundError("缺少必要文件:\n" + "\n".join(missing))

            version = datetime.now().strftime("%Y.%m.%d")
            output_file = config['output_dir'] / f"{config['pack_name']}-{version}.zip"
            output_file.parent.mkdir(parents=True, exist_ok=True)

            with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
                # 添加清单文件
                for f in config['required_files']:
                    file_path = config['source_dir'] / f
                    zipf.write(file_path, arcname=f)
                    print(f"[+] 添加文件: {f}")

                # 添加包含目录
                for d in config['include_dirs']:
                    dir_path = config['source_dir'] / d
                    for file_path in dir_path.rglob('*'):
                        if file_path.is_file():
                            arcname = file_path.relative_to(config['source_dir'])
                            zipf.write(file_path, arcname=arcname)
                            print(f"[+] 添加文件: {arcname}")

            print(f"\n✅ 客户端打包完成: {output_file}")
            self._generate_checksum(output_file)
            return 0
        except Exception as e:
            print(f"\n❌ 客户端打包失败: {str(e)}")
            return 1

    def _generate_checksum(self, file_path):
        """生成校验文件"""
        print("\n生成校验文件...")
        hashes = {
            'md5': hashlib.md5(),
            'sha1': hashlib.sha1(),
            'sha256': hashlib.sha256()
        }

        with open(file_path, 'rb') as f:
            while chunk := f.read(8192):
                for algo in hashes.values():
                    algo.update(chunk)

        for algo_name, algo in hashes.items():
            checksum = algo.hexdigest()
            target = file_path.with_name(f"{file_path.name}.{algo_name}")
            with open(target, 'w') as f:
                f.write(f"{checksum}  {file_path.name}")
            print(f"生成 {algo_name.upper()} 校验文件: {target}")

    def package_all(self):
        """执行完整打包流程"""
        print("🏗️ 开始打包流程...")
        client_result = self._package_client()
        server_result = self._package_server()
        
        print("\n" + "="*40)
        print(f"客户端打包: {'成功 ✅' if client_result == 0 else '失败 ❌'}")
        print(f"服务端打包: {'成功 ✅' if server_result == 0 else '失败 ❌'}")
        return max(client_result, server_result)

if __name__ == "__main__":
    packager = ModpackPackager()
    sys.exit(packager.package_all())
