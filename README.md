# KeyPaws
## Cat-proof your keyboard

### About KeyPaws

KeyPaws uses the cross-platform [NW.JS](https://nwjs.io/) framework (formerly node-webkit) and Apple's [Create ML](https://developer.apple.com/machine-learning/create-ml/) to detect cats on your keyboard. The code is open source and you are welcome to build your own version if you're up for having some fun and learning some cool stuff in the process. It helps to have access to a cat ;)

If you'd rather just use it, KeyPaws is available to purchase from [the KeyPaws website](https://www.keypa.ws). 

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