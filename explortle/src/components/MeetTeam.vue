<script setup lang="ts">
interface TeamMember {
  name: string
  role: string
  img: string
}

const DEFAULT_PROFILE_IMAGE =
  'https://res.cloudinary.com/dbja1kd6e/image/upload/v1746932847/blank-profile-picture-973460_1280_fuq7aw.png'

const team: TeamMember[] = [
  {
    name: 'Audrey Kim',
    role: 'Co-founder',
    img: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747015403/494831010_1437514974296913_8375346474725361787_n.jpg_neaqyr.jpg'
  },
  {
    name: 'Ashley Li',
    role: 'Co-founder',
    img: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547111/Screenshot_39_xgrmin.png'
  },
  { name: 'Rita Hu', role: 'Outreach Lead', img: '' },
  { name: 'Megan Liang', role: 'Outreach Lead', img: '' },
  {
    name: 'Binting Chen',
    role: 'Social Media Lead',
    img: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747015355/IMG_3217_qv04ku.webp'
  },
  { name: 'Tiffany He', role: 'Event Coordinator Lead', img: '' },
  { name: 'Jiaxuan Lin', role: 'Fundraising Lead', img: '' },
  { name: 'Winnie Rong', role: 'Secretary', img: '' },
  { name: 'Yi Xia', role: 'Web Development Lead', img: '' },
  { name: 'Christina Chen', role: 'Outreach', img: '' },
  {
    name: 'Elise Ann Dimatulac',
    role: 'Outreach',
    img: 'https://res.cloudinary.com/dbja1kd6e/image/upload/c_crop,w_250,h_250/v1760404190/Screenshot_4_nozc4a.png'
  },
  { name: 'Kennix Li', role: 'Social Media', img: '' },
  { name: 'Serena Zhou', role: 'Social Media', img: '' },
  { name: 'Jasmina Marupova', role: 'Social Media', img: '' },
  {
    name: 'Ocean Lin',
    role: 'Event Coordinator',
    img: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1746931063/CF222D93-011A-41A3-84C8-D638131E77F9_nvra7e.jpg'
  },
  { name: 'Eric Huang', role: 'Event Coordinator', img: '' },
  { name: 'Hui Lin (Michelle) Liu', role: 'Event Coordinator', img: '' },
  { name: 'Mandy Chen', role: 'Fundraising', img: '' },
  { name: 'Roger Zheng', role: 'Fundraising', img: '' },
  { name: 'Frank Zhu', role: 'Fundraising', img: '' },
  { name: 'Ricky Zheng', role: 'Fundraising', img: '' },
  { name: 'Alexander Lee', role: 'Fundraising', img: '' }
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl md:text-5xl font-heading font-bold text-center text-purple-700 mb-16">
      Meet the Team
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <div
        v-for="member in team"
        :key="member.name"
        class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:-translate-y-1 hover:shadow-lg"
      >
        <div
          class="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400 text-xl font-semibold overflow-hidden"
        >
          <img
            :src="member.img || DEFAULT_PROFILE_IMAGE"
            :alt="member.name"
            class="w-full h-full object-cover"
          />
        </div>

        <h2 class="text-xl font-heading font-semibold text-gray-800">{{ member.name }}</h2>
        <p class="text-purple-600 font-medium mt-1">{{ member.role }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
