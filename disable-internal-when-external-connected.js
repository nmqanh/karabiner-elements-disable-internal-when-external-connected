const fs = require('fs');
const exec = require('child_process').exec;
const EXTERNAL_KEYBOARD_ID = process.env.EXTERNAL_KEYBOARD_ID;
const INTERNAL_KEYBOARD_ID = process.env.INTERNAL_KEYBOARD_ID;
const KARABINER_CONFIG_FILE = `${process.env.HOME}/.karabiner.d/configuration/karabiner.json`;

var obj = JSON.parse(fs.readFileSync(KARABINER_CONFIG_FILE, 'utf8'));
var lastTimeUpdated = Date.now();

function setStatusForInternalKeyboard(isEnabled) {
  const selectedProfile = obj.profiles.find(p => p.selected === true);
  if (!selectedProfile) { return false; }
  const internalKeyboard = selectedProfile.devices.find(d => d.identifiers.product_id == INTERNAL_KEYBOARD_ID)
  if (!internalKeyboard) { return false; }
  if (internalKeyboard.ignore === isEnabled) { return false; }
  internalKeyboard.ignore = isEnabled;
  console.log(`Internal Keyboard is ${isEnabled ? 'enabled' : 'disabled'}!`);
  fs.writeFileSync(KARABINER_CONFIG_FILE, JSON.stringify(obj, null, 4), 'utf-8');
  lastTimeUpdated = Date.now();
  return true;
}

function checkExternalKeyboardStatus() {
  exec(`ioreg -l -w 0 | grep -i '"ProductID" = ${EXTERNAL_KEYBOARD_ID}'`, (error, stdout, stderr) => {
    if (stdout) {
      setStatusForInternalKeyboard(false) && console.log('External Keyboard Connected!');
    } else {
      setStatusForInternalKeyboard(true) && console.log('External Keyboard Disconnected!');
    }
  });
}

setInterval(checkExternalKeyboardStatus, 5000);

fs.watch(KARABINER_CONFIG_FILE, (eventType, filename) => {
  const now = Date.now();
  if (Math.abs(now - lastTimeUpdated) > 10) {
    obj = JSON.parse(fs.readFileSync(KARABINER_CONFIG_FILE, 'utf8'));
    console.log('Karabiner.json reloaded!');
  }
});
