<script lang="ts">
  const quotes: string[][] = [
    ["The hands are the instruments of man's intelligence.", "Maria Montessori", "“ ”"],
    ["The hand is the visible part of the brain.", "Immanuel Kant", "“”"],
    ["With our hands, we shape our world, turning imagination into reality.", "Unknown", "“ ”"],
    ["Dream with your mind, create with your hands.", "AI", "“ ”"],
    ["Hand is part of body, Touchless is product of Team 3.", "JS父", "(👉ﾟヮﾟ)👉"],
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<div class="d-flex flex-column justify-content-center align-items-center gap-3 p-5 start-banner appear">
  {#if quote[2]}
    <div class="h1">{quote[2]}</div>
  {/if}
  <div class="h5 text-center fw-light fst-italic mb-3">“{quote[0]}”</div>
  <div class="h5 fw-normal">— {quote[1]} —</div>
</div>
