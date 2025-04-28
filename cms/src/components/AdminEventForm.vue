<script setup>
import { ref, watch, computed, onUnmounted } from "vue";
import draggable from 'vuedraggable';
import api from "../lib/api.js";

const props = defineProps({ event: Object });
const emit = defineEmits(["saved", "cancelled"]);

const form = ref({
  title: "",
  slug: "",
  date: "",
  description: "",
  location: "",
  speakers: "",
});

const existingImageUrls = ref([]);
const imageFiles = ref([]);
const imagePreviews = ref([]);
const isUploading = ref(false);

const generatedSlug = computed(() => {
  if (!form.value.date) return "";
  try {
    const dateObj = new Date(form.value.date + 'T00:00:00');
    if (isNaN(dateObj.getTime())) return "";
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${month}${day}${year}`;
  } catch (e) {
    console.error("Error generating slug from date:", e);
    return "";
  }
});

watch(() => form.value.date, () => {
    form.value.slug = generatedSlug.value;
  }, { immediate: true }
);

watch(
  () => props.event,
  (newEvent) => {
    imagePreviews.value.forEach(preview => URL.revokeObjectURL(preview.url));
    imagePreviews.value = [];
    imageFiles.value = [];

    if (newEvent) {
        const formattedDate = newEvent.date
            ? new Date(newEvent.date).toLocaleDateString("en-CA")
            : "";
        form.value = {
            ...newEvent,
            date: formattedDate,
            slug: "",
            speakers: Array.isArray(newEvent.speakers) ? newEvent.speakers.join(", ") : newEvent.speakers || "",
        };
        existingImageUrls.value = Array.isArray(newEvent.imageUrls) ? [...newEvent.imageUrls] : [];
    } else {
      form.value = {
        title: "", slug: "", date: "", description: "", location: "", speakers: "",
      };
      existingImageUrls.value = [];
    }
  },
  { immediate: true, deep: true }
);

const handleFileChange = (e) => {
  imagePreviews.value.forEach(preview => URL.revokeObjectURL(preview.url));

  const files = Array.from(e.target.files);
  const newPreviews = files.map(file => ({
    file,
    url: URL.createObjectURL(file),
  }));

  imagePreviews.value = newPreviews;
  imageFiles.value = files;
};

const removeNewImage = (indexToRemove) => {
    if (indexToRemove < 0 || indexToRemove >= imagePreviews.value.length) return;
    const previewToRemove = imagePreviews.value[indexToRemove];
    URL.revokeObjectURL(previewToRemove.url);
    imagePreviews.value.splice(indexToRemove, 1);
};

const removeExistingImage = (indexToRemove) => {
    if (indexToRemove < 0 || indexToRemove >= existingImageUrls.value.length) return;
    existingImageUrls.value.splice(indexToRemove, 1);
};

const uploadImages = async () => {
  if (imagePreviews.value.length === 0) return [];

  isUploading.value = true;
  const uploadedUrls = [];

  try {
        const { data: sigData } = await api.get("/cloudinary/signature");

        for (const preview of imagePreviews.value) {
            const file = preview.file;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", sigData.apiKey);
            formData.append("timestamp", sigData.timestamp);
            formData.append("signature", sigData.signature);
            formData.append("folder", "explortle");

            try {
                   const res = await fetch(
                     `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
                     { method: "POST", body: formData }
                   );
                   const result = await res.json();
                   if (result.secure_url) {
                       uploadedUrls.push(result.secure_url);
                   } else {
                       console.error("Image upload failed for file:", file.name, result);
                   }
            } catch (fetchError) {
                   console.error("Network or fetch error uploading file:", file.name, fetchError);
            }
        }
  } catch(error) {
      console.error("Error fetching Cloudinary signature or during upload setup:", error);
  } finally {
       isUploading.value = false;
  }
  return uploadedUrls;
};

const submit = async () => {
  const uploadedUrls = await uploadImages();
  form.value.slug = generatedSlug.value;
  const dateToSubmit = form.value.date
      ? new Date(new Date(form.value.date + 'T00:00:00').setDate(new Date(form.value.date + 'T00:00:00').getDate() + 1)).toLocaleDateString("en-CA")
      : "";

  const payload = {
    ...form.value,
    date: dateToSubmit,
    imageUrls: [
      ...existingImageUrls.value,
      ...uploadedUrls,
    ],
    speakers: form.value.speakers.split(",").map((s) => s.trim()).filter(Boolean),
  };

  try {
    if (props.event && props.event._id) {
      await api.put(`/events/${props.event._id}`, payload);
    } else {
      await api.post("/events", payload);
    }
    emit("saved");
  } catch (error) {
    console.error("Error saving event:", error);
  }
};

const cancelForm = () => {
  emit("cancelled");
    imagePreviews.value.forEach(preview => URL.revokeObjectURL(preview.url));
    imagePreviews.value = [];
    imageFiles.value = [];
};

onUnmounted(() => {
  imagePreviews.value.forEach(preview => URL.revokeObjectURL(preview.url));
});

</script>

<template>
  <form
    @submit.prevent="submit"
    class="space-y-6 bg-white p-6 border rounded shadow-md mb-6 relative"
  >
    <input v-model="form.title" placeholder="Title" required class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"/>
    <input v-model="form.date" type="date" required class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"/>
    <div class="mt-1">
      <label class="block text-sm font-medium text-gray-500">Generated Slug (URL)</label>
      <input :value="form.slug" readonly class="w-full p-3 border rounded bg-gray-100 text-gray-600 focus:outline-none"/>
    </div>
    <input v-model="form.location" placeholder="Location" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"/>
    <textarea v-model="form.description" placeholder="Description" rows="4" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
    <input v-model="form.speakers" placeholder="Speakers (comma separated)" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"/>

    <div v-if="existingImageUrls.length > 0">
        <label class="block mb-2 font-medium text-gray-700">Current Images (Drag to reorder)</label>
        <draggable
            v-model="existingImageUrls" item-key="url"
            tag="div"
            class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 cursor-move"
            :animation="200"
        >
            <template #item="{ element: url, index }"> <div class="relative group border border-gray-300 rounded overflow-hidden">
                    <img :src="url" alt="Existing event image" class="w-full h-24 object-cover" />
                    <button
                        type="button"
                        @click.stop="removeExistingImage(index)"
                        class="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 text-xs leading-none opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-400"
                        aria-label="Remove image"
                    > &#x2715; </button>
                    <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">☰ Drag</div>
                </div>
            </template>
        </draggable>
    </div>

    <div>
        <label for="file-input" class="block mb-2 font-medium text-gray-700">Upload New Images</label>
           <label class="inline-block cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded border border-gray-300 transition duration-150 ease-in-out">
               <span>Choose Files</span>
               <input id="file-input" type="file" multiple @change="handleFileChange" class="hidden" accept="image/*"/>
           </label>
           <span v-if="imagePreviews.length > 0" class="ml-3 text-sm text-gray-600">
             {{ imagePreviews.length }} file(s) selected for upload
           </span>
    </div>

    <div v-if="imagePreviews.length > 0" class="mt-4">
        <label class="block mb-2 font-medium text-gray-700">New Images Preview (Drag to reorder)</label>
        <draggable
            v-model="imagePreviews" item-key="preview => preview.url" tag="div"
            class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 cursor-move"
            :animation="200"
        >
            <template #item="{ element: preview, index }"> <div class="relative group border border-gray-300 rounded overflow-hidden">
                    <img :src="preview.url" :alt="'Preview ' + preview.file.name" class="w-full h-24 object-cover" />
                     <button
                        type="button"
                        @click.stop="removeNewImage(index)"
                        class="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 text-xs leading-none opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-400"
                        aria-label="Remove image"
                    > &#x2715; </button>
                     <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">☰ Drag</div>
                </div>
            </template>
        </draggable>
    </div>

    <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
          <button type="button" @click="cancelForm" class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-150 ease-in-out">
            Cancel
          </button>
          <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out" :disabled="isUploading || !form.title || !form.date">
              <span v-if="isUploading">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
              </span>
              <span v-else>{{ props.event ? "Update Event" : "Create Event" }}</span>
          </button>
    </div>
  </form>
</template>

<style scoped>
.image-preview-item-new .drag-handle,
.relative.group .drag-handle { 
  cursor: grab;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  color: white;
  text-align: center;
  font-size: 0.75rem;
  padding: 0.125rem 0;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}

.relative.group:hover .drag-handle { 
  opacity: 1;
}

.sortable-ghost {
  opacity: 0.5;
  background-color: #f0f0f0; 
}

.grid.gap-4.cursor-move {
    min-height: 50px; 
}
</style>