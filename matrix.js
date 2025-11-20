window.addEventListener("load", () => {
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    const drops = [];
  
    for (let x = 0; x < columns; x++) drops[x] = 1;
  
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = "#0f0";
      ctx.font = fontSize + "px monospace";
  
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
  
    setInterval(draw, 35);
  });


const title = document.getElementById('matrix-title');
const chars = 'XYZ0123456789@#$%&*';
let originalText = title.textContent.split('');

// Fonction pour changer aléatoirement quelques lettres
function matrixFlash() {
  let newText = [...originalText];

  // Changer 1 ou 2 lettres aléatoires (pas les espaces)
  const lettersToChange = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < lettersToChange; i++) {
    let idx;
    do {
      idx = Math.floor(Math.random() * newText.length);
    } while (newText[idx] === ' '); // ne jamais remplacer les espaces
    newText[idx] = chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Construire le texte avec spans seulement pour les lettres
  title.innerHTML = newText.map(c => {
    return c === ' ' ? ' ' : `<span class="matrix-char">${c}</span>`;
  }).join('');

  // Revenir au texte original après 100ms
  setTimeout(() => {
    title.innerHTML = originalText.map(c => c === ' ' ? ' ' : `<span class="matrix-char">${c}</span>`).join('');
  }, 1000);
}

// Flash toutes les 2 secondes
setInterval(matrixFlash, 2000);
