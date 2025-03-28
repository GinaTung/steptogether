<template>
  <h3 class="text-2xl my-3 font-bold">會員管理</h3>
  <div class="card w-full">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedCustomer"
      :value="customers"
      stateStorage="session"
      stateKey="dt-state-demo-session"
      paginator
      :rows="10"
      filterDisplay="menu"
      selectionMode="single"
      dataKey="id"
      :globalFilterFields="['email', 'user.name', 'userId', 'location']"
      tableStyle="min-width: 50rem"
      :pt="{
        table: { class: 'border-collapse border border-gray-300' },
        tbody: { class: 'border-t' },
        th: { class: 'border border-gray-300 bg-gray-100' },
        td: { class: 'border border-gray-300' },
      }"
    >
      <template #header>
        <div class="flex">
          <IconField>
            <InputText
              v-model="filters['global'].value"
              placeholder="Global Search"
              class="my-3 border-1 rounded-md p-2 w-100"
            />
            <InputIcon style="transform: translate(40%, -35%)">
              <i class="pi pi-search" style="font-size: 20px" />
            </InputIcon>
          </IconField>
        </div>
      </template>
      <Column
        header="User"
        sortable
        style="width: 25%; padding: 10px 15px"
        class="p-5"
        sortField="user.name"
      >
      <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              :alt="data.user.name"
              :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.user.image}`"
              style="width: 32px"
            />
            <span>{{ data.user.name }}</span>
          </div>
        </template>
      </Column>
      <Column
      field="email"
        header="Email"
        sortable
        sortField="email"
        style="width: 25%; padding: 10px 15px"
        class="p-5"
      >
      </Column>
      <Column
      field="location"
        header="Location"
        sortable
        style="width: 25%; padding: 10px 15px"
        class="p-5"
      >
      </Column>
      <Column
        field="userId"
        header="UserId"
        sortable
        style="width: 25%; padding: 10px 15px"
        class="p-5"
      >
      </Column>
      <Column
        header="Action"
        style="padding: 10px 15px"
        class="p-5"
      >
      <template #body="{ data }">
        <div class="flex w-30">
          <button @click="handleAction(data)" class="text-white bg-[#EF6C00] rounded-lg hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 p-2" unstyled>
            編輯
          </button>
          <button @click="handleAction(data)" class="rounded-lg hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 border-1 p-2 mx-2">
            封鎖
          </button>
        </div>
      </template>
      </Column>
      <template #empty> No customers found. </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { CustomerService } from '@/service/CustomerService';
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
const customers = ref([
  {
    id: 1001,
    user:  { name: 'Amy Elsner', image: 'amyelsner.png' },
    email: 'amyElsner@mail.com',
    location: "Island Trading",
    userId: "@amyElsner",
  },
  {
    id: 1002,
    user: { name: 'Anna Fali', image: 'annafali.png' },
    email: 'annaFali@mail.com',
    location: "Global Enterprises",
    userId: "@annaFali",
  },
  {
    id: 1003,
    user: { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    email: 'asiyaJavayant@mail.com',
    location: "Mediterranean Foods",
    userId: "@asiyaJavayant",
  },
  {
    id: 1004,
    user: { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    email: 'bernardoDominic@mail.com',
    location: "Island Trading",
    userId: "@bernardoDominic",
  },
  {
    id: 1005,
    user: { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    email: 'elwinSharvill@mail.com',
    location: "Northern Ventures",
    userId: "@elwinSharvill",
  },
  {
    id: 1006,
    user:  { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    email: 'ioniBowcher@mail.com',
    location: "Outback Imports",
    userId: "@ioniBowcher",
  },
  {
    id: 1007,
    user: { name: "Sophia Patel", image: 'amyelsner.png' },
    email: 'sophiapatel@mail.com',
    location: "Tech Innovations",
    userId: "@sophiapatel",
  },
  {
    id: 1008,
    user: { name: "Lucas Mendez", image: 'annafali.png' },
    email: 'lucasmendez@mail.com',
    location: "Tropical Goods",
    userId: "@lucasmendez",
  },
  {
    id: 1009,
    user: { name: "Olivia White", image: 'asiyajavayant.png' },
    email: 'oliviawhite@mail.com',
    location: "Pacific Solutions",
    userId: "@oliviawhite",
  },
  {
    id: 1010,
    user: { name: "Michael Brown", image: 'elwinsharvill.png' },
    email: 'michaelbrown@mail.com',
    location: "Sunshine Enterprises",
    userId: "@michaelbrown",
  },
  {
    id: 1011,
    user: { name: "Emma Wilson", image: 'amyelsner.png' },
    email: 'emmawilson@mail.com',
    location: "Emerald Investments",
    userId: "@emmawilson",
  },
]);

const selectedCustomer = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  "country.name": {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
});


</script>
<style scoped>
::v-deep .p-select {
  padding: 50px !important;
  margin: 20px !important;
}
</style>
