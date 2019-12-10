# KeyPaWs
## cat-proof your keyboard

### Running locally

Clone the repository and run `npm install`.

It's important you then run `npm install nw --nwjs_build_type=sdk` as otherwise it won't work.

Edit:
```
/Users/aliblackwell/.virtualenvs/keypa.ws/lib/python3.7/site-packages/keyboard/_darwinkeyboard.py
```
428-431
```
def listen(callback):
    if not os.geteuid() == 0:
        raise OSError("Error 13 - Must be run as administrator")
    KeyEventListener(callback).run()
```