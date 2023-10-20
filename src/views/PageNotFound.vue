<!--Chat GPR-3 generated -->
<template>
  <v-container>
    <div class="error-page">
      <div class="error-content">
        <div class="error-number">
          <span class="digit">4</span>
          <img src="@/assets/death-star.png" alt="0 Image" class="zero">
          <span class="digit">4</span>
        </div>
        <div class="error-text">Ups, it seems this page has been destroyed</div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound"
}
</script>

<style>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.error-content {
  text-align: center;
}

.error-number {
  font-size: 14vw;
}

.digit {
  margin: 0 10px;
}

.zero {
  width: 10vw;
  height: auto;
}

.error-text {
  margin-top: 20px;
  font-size: 2vw;
}

</style>