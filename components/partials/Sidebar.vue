<template>
  <div
    class="sidebar active-nav d-flex justify-content-between flex-wrap flex-column"
    id="sidebar"
  >
    <PartialsSidebarLinks />
  </div>
</template>

<style scoped>
.sidebar {
  width: 309px;
  width: 15%;
  height: 100%;
  position: fixed;
  margin-left: -310px;
  background-color: #fff;
  transition: 0.5s;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);
  padding-top: 10.3rem;
}

.active-nav {
  margin-left: 0;
}

@media only screen and (max-width: 1052px) {
  .sidebar {
    display: none !important;
    width: unset !important;
  }
}
</style>
