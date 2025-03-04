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
                'output_dir': Path('builds'),
                'required_files': ['manifest.json', 'modlist.html'],
                'required_dirs': ['overrides']
            },
            'server': {
                'pack_name': 'Leisurely Life Server 1.20.1',
                'server_root': Path('.server'),
                'output_dir': Path('builds'),
                # 排除规则支持三种格式：
                # 1. 精确匹配："mod-name.jar"
                # 2. 通配符匹配："ClientMod*" (匹配开头)
                # 3. 正则匹配："re:.*-Client-.*\.jar"
                'exclude_patterns': [
                    'jei-*.jar',
                    're:.*-Client-.*\.jar',
                    'journeymap-1.20.1.jar'
                ]
            }
        }

    def _validate_server(self):
        """验证服务端根目录存在"""
        server_root = self.config['server']['server_root']
        if not server_root.exists():
            raise FileNotFoundError(f"服务端目录缺失: {server_root}")
        if not (server_root / 'mods').is_dir():
            print("⚠️ 服务端mods目录不存在")

    def _should_exclude(self, file_path):
        """判断是否要排除文件"""
        file_name = file_path.name
        patterns = self.config['server']['exclude_patterns']
        
        # 只处理mods目录下的jar文件
        if 'mods' not in file_path.parts or not file_name.endswith('.jar'):
            return False

        for pattern in patterns:
            try:
                # 正则匹配
                if pattern.startswith('re:'):
                    if re.fullmatch(pattern[3:], file_name):
                        print(f"⊖ 正则排除 [{pattern}] → {file_name}")
                        return True
                # 通配符匹配
                elif '*' in pattern:
                    regex = '^' + pattern.replace('.', '\.').replace('*', '.*') + '$'
                    if re.match(regex, file_name):
                        print(f"⊖ 通配符排除 [{pattern}] → {file_name}")
                        return True
                # 精确匹配
                else:
                    if file_name == pattern:
                        print(f"⊖ 精确排除 [{pattern}] → {file_name}")
                        return True
            except re.error as e:
                print(f"⚠️ 无效排除模式 [{pattern}]: {str(e)}")
        return False

    def _package_server(self):
        """打包服务端专用方法"""
        try:
            self._validate_server()
            config = self.config['server']
            version = datetime.now().strftime("%Y.%m.%d")
            zip_name = config['output_dir'] / f"{config['pack_name']}-{version}.zip"

            with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
                # 遍历整个.server目录
                for file_path in config['server_root'].rglob('*'):
                    if file_path.is_file():
                        # 转换相对路径
                        rel_path = file_path.relative_to(config['server_root'])
                        
                        # 应用排除规则
                        if self._should_exclude(file_path):
                            continue
                            
                        # 添加到压缩包
                        zipf.write(file_path, arcname=rel_path)
                        print(f"✓ 添加文件: {rel_path}")

            print(f"\n🔼 服务端打包完成: {zip_name}")
            self._generate_checksum(zip_name)
            return 0
        except Exception as e:
            print(f"\n❌ 服务端打包失败: {str(e)}")
            return 1

    def _package_client(self):
        """打包客户端（保持原逻辑）"""
        # ... 保持你原有的客户端打包逻辑不变 ...

    def _generate_checksum(self, file_path):
        """生成校验文件（保持原逻辑）"""
        # ... 保持你原有的校验生成逻辑 ...

    def package_all(self):
        client_code = self._package_client()
        server_code = self._package_server()
        return max(client_code, server_code)

if __name__ == "__main__":
    packager = ModpackPackager()
    sys.exit(packager.package_all())
