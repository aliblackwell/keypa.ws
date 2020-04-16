# KeyPaws
## Cat-proof your keyboard

### About KeyPaws

KeyPaws uses the cross-platform [NW.JS](https://nwjs.io/) framework (formerly node-webkit) and Apple's [Create ML](https://developer.apple.com/machine-learning/create-ml/) to detect cats on your keyboard. The code is open source and you are welcome to build your own version if you're up for having some fun and learning some cool stuff in the process. It helps to have access to a cat ;)

If you'd rather just use it, KeyPaws is available to purchase from [the KeyPaws website](https://www.keypa.ws). 

### Deploying website

The KeyPaws website is a static site generated using [Eleventy](https://www.11ty.dev/). Netlify has been configured to only deploy if there's a push to the `website` branch, to reduce the project's carbon footprint.

### Training the model

There are scripts inside package.json for everything you might want to do. To gather cat or human keyboard data to train the model with, run `npm run record:human` or `npm run record:cat`. This will create a file for every second the keyboard is being used in a corresponding directory inside `./capture/`. Once you've gathered the data you need to format it for the model which you can do by running `npm run ml:wrangle`. Finally, download and install XCode and open the CreateML application that it comes bundled with. The wrangle script creates three files, training.csv, testing.csv and validate.csv. Use training and testing in the CreateML GUI to train the model, and then validate.csv can be used to manually validate it.



### Running locally

Clone the repository and run `npm install`.

It's important you then run `npm install nw --nwjs_build_type=sdk` as otherwise it won't work.


### Building

Building for Mac:

On old computer:

`npm run clean:python`
`npm run build:keypaws`
`npm run bundle:python`

On new computer:

`npm run clean:python`

Copy './background' from old computer to new computer.

On new computer:

`npm run build:bundle`






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