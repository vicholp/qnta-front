<template>
  <div class="p-5 max-w-xl mx-auto flex flex-col gap-7">
    <div class="flex justify-center">
      <div class="text-center text-4xl font-light bg-clip-text text-transparent bg-linear-to-r w-min from-blue-600 to-purple-500">
        qnta.cl
      </div>
    </div>
    <div class="">
      Obtén un enlace único a tus datos bancarios
    </div>
    <div class="bg-neutral-950/50 border border-neutral-800 p-5 rounded-xl flex flex-col gap-5">
      <div class="flex flex-col gap-4">

        <div class="flex gap-2 items-center">
          <div class="flex gap-2 items-center  w-full">
            <div class="w-1/3 text-end font-medium">
              nombre
            </div>
            <div class="w-2/3 flex">
              <div class="border rounded px-2 py-1 border-neutral-800 flex w-full h-10">
                <input type="text" class="focus-visible:outline-none" placeholder="Alexis Sanchez" v-model="account.name">
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <div class="flex gap-2 items-center w-full">
            <div class="w-1/3 text-end font-medium">
              rut
            </div>
            <div class="w-2/3 flex">
              <div class="border rounded px-2 py-1 border-neutral-800 flex w-full h-10">
                <input type="text" class="focus-visible:outline-none" placeholder="12345678-9" v-model="account.rut">
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex gap-2 items-center w-full">
            <div class="w-1/3 text-end font-medium">
              banco
            </div>
            <div class="w-2/3 flex">
              <div class="border rounded px-2 py-1 border-neutral-800 flex w-full h-10">
                 <select v-model="account.bank" class="focus-visible:outline-none w-full bg-transparent">
                  <option value="" disabled>banco</option>
                  <option v-for="bank in BANKS" :key="bank.value" :value="bank.value">{{ bank.label }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex gap-2 items-center w-full">
            <div class="w-1/3 text-end font-medium">
              tipo de cuenta
            </div>
            <div class="w-2/3 flex">
              <div class="border rounded px-2 py-1 border-neutral-800 flex w-full h-10">
                  <select v-model="account.type" class="focus-visible:outline-none w-full bg-transparent">
                    <option value="" disabled>tipo</option>
                    <option v-for="type in ACCOUNT_TYPES" :key="type.value" :value="type.value">{{ type.label }}</option>
                  </select>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 items-center">
        <div class="flex gap-2 items-center w-full">
            <div class="w-1/3 text-end font-medium">
              cuenta
            </div>
            <div class="w-2/3 flex">
              <div class="border rounded px-2 py-1 border-neutral-800 flex w-full h-10">
                <input type="text" class="focus-visible:outline-none" placeholder="0-0000-1234-5" v-model="account.number">
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex gap-2 items-center w-full">
            <div class="w-1/3 text-end font-medium">
              correo
            </div>
            <div class="w-2/3 flex">
              <div class="border rounded px-2 py-1 border-neutral-800 flex w-full h-10">
                <input type="text" class="focus-visible:outline-none" placeholder="correo@ejemplo.com" v-model="account.email">
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex gap-2 items-center  w-full">
            <div class="w-1/3 text-end font-medium">
              enlace
            </div>
            <div class="w-2/3 flex">
              <div class="border rounded px-2 py-1 border-neutral-800 flex w-full h-10 items-center">
                <div class="italic">qnta.cl/</div><input type="text" class="focus-visible:outline-none" placeholder="cabrochico" v-model="account.slug">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-neutral-50 font-medium text-sm bg-neutral-950/50 rounded-lg p-2 text-center" @click="register" :class="{ 'opacity-50 cursor-not-allowed': !isValid }" :disabled="!isValid">
        guardar datos en qnta.cl/{{ account.slug }}
      </div>
    </div>
    <div class="bg-neutral-950 p-3 rounded text-neutral-300 text-center text-sm">
      te equivocaste? registrate de nuevo con el mismo rut
    </div>
    <div class="px-5 py-3 gap-5 text-sm">
        Inspirado fuertemente en num.cl <br>
        Hecho por un ser de carne y hueso 🍖.
        Revisa el codigo en <a href="github.com/vicholp/qnta">GitHub</a>.
    </div>
  </div>
</template>
<script>

import { BANKS, ACCOUNT_TYPES } from './consts.js';
import { createAccount } from './api.js';

export default {
  name: "App",
  data() {
    return {
      account: {
        name: "",
        slug: "",
        rut: "",
        bank: "",
        type: "",
        number: "",
        email: "",
      }, 
      BANKS, 
      ACCOUNT_TYPES,
      message: null,
    };
  },
  computed: {
    isValid() {
      return (
        this.account.name &&
        this.account.slug &&
        this.account.rut &&
        this.account.bank &&
        this.account.type &&
        this.account.number &&
        this.account.email
      );
    }
  },
  methods: {
    async register() {
      const result = await createAccount(this.account);
      if (result.status === 201) {
        this.$router.push(`/${this.account.slug}`);
      }
    }
  }
};

</script>
