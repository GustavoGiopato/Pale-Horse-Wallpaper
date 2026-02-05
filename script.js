let chance = 0.002;
let checkEveryMs = 5000;
let visibleMs = 5000;
let cooldownMs = 7000;

let enabled = true;
let coolingDown = false;
const horse = document.getElementById("horse");

function showHorse() {
  horse.style.opacity = "1";

  setTimeout(() => {
    horse.style.opacity = "0";
  }, visibleMs);

  coolingDown = true;
  setTimeout(() => {
    coolingDown = false;
  }, cooldownMs);
}

function loop() {
  if (enabled && !coolingDown) {
    if (Math.random() < chance) {
      showHorse();
    }
  }
  setTimeout(loop, Math.max(200, checkEveryMs | 0));
}

loop();

window.wallpaperPropertyListener = {
  applyUserProperties: function(properties) {
    
    if (properties.enabled) {
      enabled = !!properties.enabled.value;
      if (!enabled) horse.style.opacity = "0";
    }
    if (properties.chance) {
      chance = Math.max(0, Math.min(1, properties.chance.value / 100));
    }
    if (properties.checkeveryms) checkEveryMs = properties.checkeveryms.value;
    if (properties.visiblems) visibleMs = properties.visiblems.value;
    if (properties.cooldownms) cooldownMs = properties.cooldownms.value;
    if (properties.fadems) setFade(properties.fadems.value);
  }
};
