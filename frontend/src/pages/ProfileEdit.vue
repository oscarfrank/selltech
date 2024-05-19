<template>
  <Layout>
    <div class="profile-edit">
      <h2>Edit Profile</h2>
      <form @submit.prevent="updateProfile">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" v-model="user.firstName" id="firstName" required />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="user.lastName" id="lastName" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="user.email" id="email" required />
        </div>
        <div>
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" v-model="user.phoneNumber" id="phoneNumber" />
        </div>
        <div>
          <label for="address">Address:</label>
          <input type="text" v-model="user.address" id="address" />
        </div>
        <div>
          <label for="bankDetails">Bank Details:</label>
          <input type="text" v-model="user.bankDetails" id="bankDetails" />
        </div>
        <div>
          <label for="profilePhoto">Profile Photo:</label>
          <input
            type="file"
            @change="handleFileUpload('profilePhoto', $event)"
          />
        </div>
        <div>
          <label for="shopBackgroundPhoto">Shop Background Photo:</label>
          <input
            type="file"
            @change="handleFileUpload('shopBackgroundPhoto', $event)"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import Layout from "../components/Layout.vue";
import { useToast } from "vue-toast-notification";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        bankDetails: "",
        profilePhoto: "",
        shopBackgroundPhoto: "",
      },
      profilePhoto: null,
      shopBackgroundPhoto: null,
    };
  },
  async created() {
    await this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const { data } = await axios.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.user = data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    handleFileUpload(field, event) {
      if (field === "profilePhoto") {
        this.profilePhoto = event.target.files[0];
      } else if (field === "shopBackgroundPhoto") {
        this.shopBackgroundPhoto = event.target.files[0];
      }
    },
    async updateProfile() {
      const toast = useToast();
      const formData = new FormData();
      formData.append("firstName", this.user.firstName);
      formData.append("lastName", this.user.lastName);
      formData.append("email", this.user.email);
      formData.append("phoneNumber", this.user.phoneNumber);
      formData.append("address", this.user.address);
      formData.append("bankDetails", this.user.bankDetails);

      if (this.profilePhoto) {
        formData.append("profilePhoto", this.profilePhoto);
      }
      if (this.shopBackgroundPhoto) {
        formData.append("shopBackgroundPhoto", this.shopBackgroundPhoto);
      }

      try {
        const { data } = await axios.put(
          "http://localhost:5002/api/profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Profile updated successfully");
        this.user = data;
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    },
  },
};
</script>

<style scoped>
.profile-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 600px;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 5px;
}

form input[type="text"],
form input[type="email"],
form input[type="file"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}
</style>
