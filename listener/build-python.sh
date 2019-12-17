#!/bin/sh
pyinstaller --noconfirm --log-level=WARN \
    --onefile \
    --osx-bundle-identifier=com.mindfulpuss.keypaws \
    keypaws.py \
    ./keypaws.spec
