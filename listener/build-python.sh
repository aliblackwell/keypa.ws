#!/bin/sh
pyinstaller --noconfirm --log-level=WARN \
    --onefile \
    --osx-bundle-identifier=com.mindfulpuss.KeyPaws \
    keypaws.py \
    ./keypaws.spec
