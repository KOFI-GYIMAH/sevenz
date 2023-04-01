<template>
  <div class="form-wrapper">
    <div class="mb-10">
      <h2>Update Patients Medical Record</h2>
      <p>Click the tabs to view and edit patient medical details</p>
    </div>

    <div v-if="auth.loggedIn === false" class="text-center">
      <button @click="login" type="submit" class="btn btn-primary">
        Click to login
      </button>
    </div>

    <div v-else class="form-content">
      <PartialsLoading v-if="isLoading" />

      <div v-else>
        <div>
          <h3>X-Ray</h3>

          <div class="row g-5">
            <div
              v-for="category in categories"
              :key="category.id"
              class="form-check col-xl-3 col-lg-6 col-sm-6 col-12"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="newCategoryValue"
                :value="category.id"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                {{ category.title }}
              </label>
            </div>
          </div>
        </div>

        <hr />

        <div>
          <h3>Ultrasound Scan</h3>

          <div class="row g-5">
            <div
              v-for="test in tests"
              :key="test.id"
              class="form-check col-xl-3 col-lg-6 col-sm-6 col-12"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="newTestValue"
                :value="test.title"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                {{ test.title }}
              </label>
            </div>
          </div>
        </div>

        <hr />

        <form @submit.prevent>
          <div class="row g-5 select-form">
            <div class="col-12 col-lg-6">
              <label for="exampleFormControlInput1" class="form-label">
                CT Scan
              </label>

              <select class="form-select" aria-label="Default select example">
                <option selected>*Specify</option>
              </select>
            </div>

            <div class="col-12 col-lg-6">
              <label for="exampleFormControlInput1" class="form-label">
                MRI
              </label>

              <select class="form-select" aria-label="Default select example">
                <option selected>*Specify</option>
              </select>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button @click="create" type="submit">
              <span v-if="isSending">Sending...</span>
              <span v-else>Save and Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useContext } from "@nuxtjs/composition-api";
import { useAuthentication } from "~/composable/auth";
import { useState } from "~/helpers";
import { CREATE_INVESTIGATIONS_MUTATION } from "~/schemes";

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const isSending = ref(false);
const newCategoryValue = ref([]);
const newTestValue = ref([]);

const { login } = useAuthentication();
const { app, $swal } = useContext();

const { categories, tests, auth } = useState(["categories", "tests", "auth"]);

const create = async () => {
  isSending.value = true;
  const numArray = newCategoryValue.value.map((str) => Number(str));
  const client = app.apolloProvider.defaultClient;

  try {
    await client
      .mutate({
        mutation: CREATE_INVESTIGATIONS_MUTATION,
        variables: { investigations: numArray },
      })
      .then(({ data }) => data);
    $swal({
      titleText: "Form Submitted Successfully✨.",
      confirmButtonColor: "#2a36a4",
      icons: "success",
    });
  } catch (e) {
    $swal("Something went wrong✨.");
  }
  isSending.value = false;
};
</script>

<style scoped>
.form-wrapper {
  padding: 1rem 5rem;
}

.form-wrapper h2 {
  color: var(--deep-blue);
  margin-bottom: 1.2rem;
  font-size: 32px;
}

.form-wrapper p {
  color: var(--gray);
  font-size: 16px;
}

.form-content {
  background-color: #fff;
  padding: 4rem 6rem;
  border-radius: 5px;
}

.form-content h3 {
  color: var(--deep-blue);
  font-size: 18px;
  margin-bottom: 2rem;
  font-weight: 600;
}

hr {
  margin-bottom: 3rem;
  margin-top: 3rem;
}

label {
  color: #000;
  font-weight: 500;
}

button {
  background: var(--deep-blue);
  border-radius: 7px;
  color: #fff;
  padding: 0.8rem;
  outline: none;
  border: none;
  margin-top: 1rem;
}

.select-form label {
  color: #9fa2b4;
}

.form-select {
  color: #9fa2b4;
  border: 1px solid #9fa2b4;
}

@media only screen and (max-width: 754px) {
  .form-wrapper {
    padding: 1rem;
  }

  .form-content {
    padding: 4rem 3rem;
  }
}
</style>
