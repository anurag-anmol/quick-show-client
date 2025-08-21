// inngest/index.js
import { Inngest } from "inngest";
// import User from "../models/User.js";

// ✅ Create Inngest client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// ✅ Clerk -> Inngest functions

// Create user
const syncUserCreation = inngest.createFunction(
    { id: "sync-user-form-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address, // ✅ Fix typo: should be email_address
            name: `${first_name} ${last_name}`,
            image: image_url,
        };
        await User.create(userData);
        console.log('✅ User created:', userData);
    }
);

// Delete user
const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-with-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data;
        await User.findByIdAndDelete(id);
        console.log('🗑️ User deleted:', id);
    }
);

// Update user
const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address, // ✅ Fix typo: should be email_address
            name: `${first_name} ${last_name}`,
            image: image_url,

            // name: `${first_name} ${last_name}`,
            // email: email_addresses[0].email_address,
            // image: image_url,
        };
        await User.findByIdAndUpdate(id, userData);
        console.log('♻️ User updated:', userData);
    }
);

// ✅ Export functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
