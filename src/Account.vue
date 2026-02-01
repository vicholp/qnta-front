<template>
  <div class="p-5 max-w-xl mx-auto flex flex-col gap-10">
    <div class="flex justify-center">
      <div
        class="text-center text-4xl font-light bg-clip-text text-transparent bg-linear-to-r w-min from-blue-600 to-purple-500">
        qnta.cl
      </div>
    </div>
    <div class="bg-neutral-950/50 border border-neutral-800 p-5 rounded-xl flex flex-col gap-5">
      <div class="font-bold">
        {{ account ? account.name : 'Cargando...' }} - {{ account ? account.slug : 'Cargando...' }}
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <div>
            {{ account ? account.name : 'Cargando...' }}
          </div>
          <div class="ml-auto text-xs bg-neutral-800 px-2 py-1 rounded-full" @click="copyText(account.name)">
            copiar
          </div>
        </div>
        <div class="flex gap-2">
          <div>
            {{ account ? account.rut : 'Cargando...' }}
          </div>
          <div class="ml-auto text-xs bg-neutral-800 px-2 py-1 rounded-full" @click="copyText(account.rut)">
            copiar
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div>
            {{account ? BANKS.find(bank => bank.value === account.bank)?.label : 'Cargando...'}}
          </div>
          <div class="ml-auto text-xs bg-neutral-800 px-2 py-1 rounded-full" @click="copyText(account.bank)">
            copiar
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div>
            {{account ? ACCOUNT_TYPES.find(type => type.value === account.type)?.label : 'Cargando...'}}
          </div>
          <div class="ml-auto text-xs bg-neutral-800 px-2 py-1 rounded-full" @click="copyText(account.type)">
            copiar
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div class="italic">
            Cuenta
          </div>
          <div>
            {{ account ? account.number : 'Cargando...' }}
          </div>
          <div class="ml-auto text-xs bg-neutral-800 px-2 py-1 rounded-full" @click="copyText(account.number)">
            copiar
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div>
            {{ account ? account.email : 'Cargando...' }}
          </div>
          <div class="ml-auto text-xs bg-neutral-800 px-2 py-1 rounded-full" @click="copyText(account.email)">
            copiar
          </div>
        </div>
        
      </div>
      <div class="border border-neutral-50 font-medium text-sm bg-neutral-950/50 rounded-lg p-2 text-center" @click="copyAll">
        Copiar todos los datos
      </div>
    </div>
    <div class="bg-neutral-950 p-3 rounded text-neutral-300 text-center text-sm flex flex-col gap-3">
      <RouterLink to="/" class="font-bold underline cursor-pointer">
        Registrate aqui
      </RouterLink>
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
import { getAccount } from './api.js';

export default {
  name: "App",
  data() {
    return {
      account: null,
      accountName: this.$route.params.accountName,
      BANKS,
      ACCOUNT_TYPES,
    };
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text);
    },
    copyAll() {
      const allData = `${this.account.name}
      ${this.account.rut}
      ${this.BANKS.find(bank => bank.value === this.account.bank)?.label}
      ${this.ACCOUNT_TYPES.find(type => type.value === this.account.type)?.label}
      ${this.account.number}
      ${this.account.email}`;
      navigator.clipboard.writeText(allData);
    },
  },
  mounted() {
    getAccount(this.accountName).then((data) => {
      this.account = data.data;
    });
  },
};

</script>
