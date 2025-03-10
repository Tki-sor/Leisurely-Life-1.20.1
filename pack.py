import os
import sys
import zipfile
import hashlib
import re
import shutil
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
                'source_dir': Path('server'),
                'output_dir': Path('builds'),
                # 排除规则配置
                'exclude': {
                    'patterns': [
                        # 're:.*\.bak',            # 正则匹配备份文件
                        # 'ClientOnlyMod*.jar',    # 通配符匹配
                        # 'config/secret.cfg'      # 全路径匹配
                    ],
                    'mods_patterns': [          # mods目录专用排除规则
                        # 're:.*-Forge-.*\.jar',
                        # 'JourneyMap-*.jar'
                        '*Hide Key Binding*',
                        '0Pack2Reload*',
                        '0World2Create*',
                        'BetterF3*',
                        'bwncr*',
                        'clienttweaks*',
                        'Controlling*',
                        'DefaultWorldType*',
                        'drippyloadingscreen*',
                        'embeddium*',
                        'entity_model_features*',
                        'entity_texture_features*',
                        'entityculling*',
                        'extrasounds*',
                        'fancymenu*',
                        'Fastquit*',
                        'flerovium*',
                        'gpumemleakfix*',
                        'konkrete*',
                        'mcwifipnp*',
                        'melody*',
                        'MiniEffects*',
                        'ModernUI*',
                        'MouseTweaks*',
                        'MyServerIsCompatible*',
                        'NekosEnchantedBooks*',
                        'NonConflictKeys*',
                        'notenoughcrashes*',
                        'oculus*',
                        'OverflowingBars*',
                        'PickUpNotifier*',
                        'probejs*',
                        'Resourcify*',
                        'rubidium*',
                        'screenshot-to-clipboard*',
                        'Searchables*',
                        'Shut Up GL Error*',
                        'skinlayers3d*',
                        'sodiumdynamiclights*',
                        'sodiumextras*',
                        'sodiumoptionsapi*',
                        'sodiumoptionsmodcompat*',
                        'spark*',
                        'BackupManager*',
                        'BetterAdvancements*',
                        'clientcrafting*',
                        'inventoryhud*',
                        'jecharacters*',
                        'JustEnoughResources*',
                        'ItemPhysicLite*'
                    ]
                }
            }
        }

    def _should_exclude(self, relative_path, patterns):
        """判断是否应该排除文件（保持原逻辑不变）"""
        path_str = str(relative_path)
        name = relative_path.name
        
        for pattern in patterns:
            try:
                if pattern.startswith('re:'):
                    regex = pattern[3:]
                    if re.fullmatch(regex, path_str) or re.fullmatch(regex, name):
                        return True
                elif '*' in pattern:
                    regex = re.escape(pattern).replace(r'\*', '.*') + '$'
                    if re.match(regex, path_str) or re.match(regex, name):
                        return True
                else:
                    if path_str == pattern:
                        return True
            except re.error:
                print(f"警告：无效的正则表达式模式 '{pattern}'")
                continue
        return False

    def _package_client(self):
        """新版客户端打包（目录复制）"""
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

            # 清理并创建构建目录
            if config['build_dir'].exists():
                shutil.rmtree(config['build_dir'])
            config['build_dir'].mkdir(parents=True)

            # 复制清单文件
            for f in config['required_files']:
                dest = config['build_dir'] / f
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(config['source_dir'] / f, dest)

            # 复制覆盖目录
            for d in config['include_dirs']:
                src = config['source_dir'] / d
                dest = config['build_dir'] / d
                shutil.copytree(src, dest, dirs_exist_ok=True)

            print(f"\n✅ 客户端文件准备完成: {config['build_dir']}")
            return 0
        except Exception as e:
            print(f"\n❌ 客户端准备失败: {str(e)}")
            return 1

    def _package_server(self):
        """新版服务端打包（目录复制）"""
        config = self.config['server']
        try:
            if not config['source_dir'].exists():
                raise FileNotFoundError(f"服务端目录不存在: {config['source_dir']}")

            # 清理并创建构建目录
            if config['build_dir'].exists():
                shutil.rmtree(config['build_dir'])
            config['build_dir'].mkdir(parents=True)

            exclude_patterns = config['exclude']['patterns']
            mods_exclude = config['exclude']['mods_patterns']

            # 复制文件并应用排除规则
            for file_path in config['source_dir'].rglob('*'):
                if file_path.is_dir():
                    continue

                relative_path = file_path.relative_to(config['source_dir'])
                all_excludes = exclude_patterns.copy()
                
                if relative_path.parts[0] == 'mods':
                    all_excludes += mods_exclude
                
                if self._should_exclude(relative_path, all_excludes):
                    continue

                dest = config['build_dir'] / relative_path
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(file_path, dest)

            print(f"\n✅ 服务端文件准备完成: {config['build_dir']}")
            return 0
        except Exception as e:
            print(f"\n❌ 服务端准备失败: {str(e)}")
            return 1

    def package_all(self):
        """执行完整打包流程"""
        print("🏗️ 开始打包流程...")
        client_result = self._package_client()
        server_result = self._package_server()
        
        print("\n" + "="*40)
        print(f"客户端准备: {'成功 ✅' if client_result == 0 else '失败 ❌'}")
        print(f"服务端准备: {'成功 ✅' if server_result == 0 else '失败 ❌'}")
        return max(client_result, server_result)

if __name__ == "__main__":
    packager = ModpackPackager()
    sys.exit(packager.package_all())