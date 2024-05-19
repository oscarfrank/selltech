<template>
  <div class="dialog">
    <div class="dialog-content">
      <p>Are you sure you want to delete this device?</p>
      <button @click="$emit('confirm')">Yes</button>
      <button @click="$emit('cancel')">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationDialog',
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
