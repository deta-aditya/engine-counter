(function() {
  let gold = 3;
  let vp = 0;

  const goldValue = document.getElementById('gold-value');
  const goldPlus = document.getElementById('gold-plus');
  const goldMinus = document.getElementById('gold-minus');
  const vpValue = document.getElementById('vp-value');
  const vpPlus = document.getElementById('vp-plus');
  const vpMinus = document.getElementById('vp-minus');
  const reset = document.getElementById('reset-button');

  goldPlus.onclick = () => {
    gold += 1;
    goldValue.textContent = gold;
  }
  goldMinus.onclick = () => {
    gold -= 1;
    goldValue.textContent = gold;
  }
  vpPlus.onclick = () => {
    vp += 1;
    vpValue.textContent = vp;
  }
  vpMinus.onclick = () => {
    vp -= 1;
    vpValue.textContent = vp;
  }
  reset.onclick = () => {
    gold = 3;
    vp = 0;
    goldValue.textContent = gold;
    vpValue.textContent = vp;
  }
})();
