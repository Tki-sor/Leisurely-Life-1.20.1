import os
import sys
import zipfile
import hashlib
import shutil
import re
from datetime import datetime
from pathlib import Path

class ModpackPackager:
    def __init__(self):
        self.config = {
            'client': {
                'pack_name': 'Leisurely Life 1.20.1',
                'source_dir': Path('.'),
                'output_dir': Path('build/client'),
                'required_files': ['manifest.json', 'modlist.html'],
                'include_dirs': ['overrides']
            },
            'server': {
                'pack_name': 'Leisurely Life Server 1.20.1',
                'source_dir': Path('server'),
                'output_dir': Path('build/server'),
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
        # 保持原有的排除逻辑不变
        path_str = str(relative_path)
        name = relative_path.name
        
        for pattern in patterns:
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
        return False

    def _process_server(self):
        config = self.config['server']
        try:
            if not config['source_dir'].exists():
                raise FileNotFoundError(f"服务端目录不存在: {config['source_dir']}")

            # 清空并创建输出目录
            shutil.rmtree(config['output_dir'], ignore_errors=True)
            config['output_dir'].mkdir(parents=True, exist_ok=True)

            exclude_patterns = config['exclude']['patterns']
            mods_exclude = config['exclude']['mods_patterns']

            for src_path in config['source_dir'].rglob('*'):
                if not src_path.is_file():
                    continue

                relative_path = src_path.relative_to(config['source_dir'])
                all_excludes = exclude_patterns.copy()
                
                if relative_path.parts[0] == 'mods':
                    all_excludes += mods_exclude

                if self._should_exclude(relative_path, all_excludes):
                    continue

                dest_path = config['output_dir'] / relative_path
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_path, dest_path)

            print(f"✅ 服务端文件处理完成: {config['output_dir']}")
            return 0
        except Exception as e:
            print(f"❌ 服务端处理失败: {str(e)}")
            return 1

    def _process_client(self):
        config = self.config['client']
        try:
            # 验证必要文件
            missing = []
            for f in config['required_files'] + config['include_dirs']:
                if not (config['source_dir'] / f).exists():
                    missing.append(str(f))
            if missing:
                raise FileNotFoundError(f"缺少必要文件: {', '.join(missing)}")

            # 清空并创建输出目录
            shutil.rmtree(config['output_dir'], ignore_errors=True)
            config['output_dir'].mkdir(parents=True, exist_ok=True)

            # 复制文件
            for f in config['required_files']:
                src = config['source_dir'] / f
                dest = config['output_dir'] / f
                if src.is_dir():
                    shutil.copytree(src, dest)
                else:
                    shutil.copy2(src, dest)

            # 复制目录
            for d in config['include_dirs']:
                src = config['source_dir'] / d
                dest = config['output_dir'] / d
                shutil.copytree(src, dest, dirs_exist_ok=True)

            print(f"✅ 客户端文件处理完成: {config['output_dir']}")
            return 0
        except Exception as e:
            print(f"❌ 客户端处理失败: {str(e)}")
            return 1

    def process_all(self):
        print("🏗️ 开始处理文件...")
        client_code = self._process_client()
        server_code = self._process_server()
        
        print("\n" + "="*40)
        print(f"客户端处理: {'成功 ✅' if client_code == 0 else '失败 ❌'}")
        print(f"服务端处理: {'成功 ✅' if server_code == 0 else '失败 ❌'}")
        return max(client_code, server_code)

if __name__ == "__main__":
    packager = ModpackPackager()
    sys.exit(packager.process_all())