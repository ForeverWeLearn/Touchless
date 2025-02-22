<script lang="ts">
</script>

<main>
  <div class="homepage" data-tauri-drag-region>
    <div class="overlay">
      <h1 class="app-name">Touchless</h1>
      <p class="tagline">Touch Nothing, Control Everything!</p>
    </div>
  </div>
</main>

<style>
  .homepage {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, #ffb830, #30cfd0);
  }

  .overlay {
    text-align: center;
    color: white;
  }

  .app-name {
    font-size: 4.5rem;
    font-weight: bold;
    text-transform: uppercase;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }

  .tagline {
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 10px;
    color: #f8f9fa;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
</style>
