<script lang="ts">
  const quotes: string[][] = [
    ["The hands are the instruments of man's intelligence.", "Maria Montessori", "(★‿★)"],
    ["The hand is the visible part of the brain.", "Immanuel Kant", "o(*￣▽￣*)ブ"],
    ["With our hands, we shape our world, turning imagination into reality.", "Unknown", "(@^0^@)/"],
    ["Dream with your mind, create with your hands.", "ChatGPT", "ㄟ( ▔, ▔ )ㄏ"],
    ["Hand is part of body, Touchless is product of Team 3.", "JS父", "(👉ﾟヮﾟ)👉"],
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<div class="d-flex flex-column justify-content-center align-items-center p-4 start-banner">
  <div class="h1 mb-4">{quote[2]}</div>
  <div class="h5 fw-light fst-italic">"{quote[0]}"</div>
  <div class="h5 fw-normal">— {quote[1]} —</div>
</div>
