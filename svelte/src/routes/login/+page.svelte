<script lang="ts">
</script>

<form method="POST" action="?/login">
  <label for="username">Username</label>
  <input type="text" id="username" name="username" minlength="1" required />
  <button type="submit">Login</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  button {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #65d6b0;
    color: #686868;
    font-weight: bold;
    cursor: pointer;
  }
</style>
