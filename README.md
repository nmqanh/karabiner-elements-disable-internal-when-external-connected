# How to Disable Internal Keyboard when placing External Keyboard on top in Karabiner-Elements and MacOS Serria

## Why do we need this?
Previously, Karabiner has the feature to automatically disable the internal keyboard when your external keyboard connected so you can easily put it on the top of your internal keyboard without worrying about the key conflicting. But now Karabiner is no longer working with MacOS Serria so the author [Tekezo](https://github.com/tekezo) is remaking it as [Karabiner-Elements](https://github.com/tekezo/Karabiner-Elements), this developing Karabiner-Elements have not included the mentioned feature above yet, but it allows you to modify it `karabiner.json` configuration in order to map keys of any keyboards. So I did a hack to make this happen again so I can keep placing my favourite [Filco Minila Air](https://www.diatec.co.jp/en/det.php?prod_c=1471) on the Apple Internal Keyboard again.

## How to do this?
### Step 1. You need following details: 
* Your Internal keyboard identifiers. 
* Your External keyboard identifiers.

Notes: You can easily find these when connected both keyboards, set some settings in Karabiner-Elements then they will show up in `~/.karabiner.d/configuration/karabiner.json` through `profiles.devices`.

### Step 2. Replacing my karabiner.json in this project with yours
* Use my `karabiner.json` in this project, it contains all the rules to Disable all Keyboard buttons.
* Replace the `devices` section by your current `devices` you got above in **Step 1**.
* Make sure all devices are set with `ignore: true` so it this configuration is not activated by default.

### Step 3. Setup Node.js script to automatically disable internal keyboard when external keyboard connected and vice versa
* Install node js >= 4.x (directly or nvm or whatever).
* Copy my script `disable-internal-when-external-connected.js` to some place you like.
* Remembering in **Step 1**, You got the `product_id`s of your internal keyboard and external keyboard. In my case, my internal keyboard product_id is `628` and my external keyboard product_id is `34050`.
* Now run command:
```
EXTERNAL_KEYBOARD_ID=[product_id of external] INTERNAL_KEYBOARD_ID=[product_id of internal] node disable-internal-when-external-connected.js
```
  
* E.g. in my case it will be :
```
EXTERNAL_KEYBOARD_ID=34050 INTERNAL_KEYBOARD_ID=628 node disable-internal-when-external-connected.js
```

That's it, now it will automaically disable your internal keyboard when your external keyboard is connected and it will re-enable your internal keyboard when your external keyboard is disconnceted. Woo hooo!

Any feedback is welcome!

Happy Hacking!