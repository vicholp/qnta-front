<template>
  <div class="p-5 max-w-xl mx-auto flex flex-col gap-10">
    
    <div class="glass-card dark:bg-neutral-950/50 border dark:border-neutral-800 p-5 rounded-xl flex flex-col gap-5 bg-neutral-50 border-neutral-100 shadow-lg dark:shadow-none" v-if="!account_not_found">
      <div class="flex justify-center">
      <div
        class="text-center text-4xl font-light bg-clip-text text-transparent bg-linear-to-r w-min from-blue-600 to-purple-500">
        qnta.cl
      </div>
    </div>
      <div class="font-bold">
        {{ account ? account.name : 'Cargando...' }} - {{ account ? account.slug : 'Cargando...' }}
      </div>
      <div class="flex flex-col gap-4">
        <AccountField icon="bi bi-person-arms-up" :value="account?.name" />
        <AccountField icon="bi bi-person-vcard" :value="account?.rut" />
        <AccountField icon="bi bi-bank" :value="account ? BANKS.find(bank => bank.value === account.bank)?.label : ''" />
        <AccountField icon="bi bi-wallet2" :value="account ? ACCOUNT_TYPES.find(type => type.value === account.type)?.label : ''" />
        <AccountField icon="bi bi-credit-card" :value="account?.number" />
        <AccountField icon="bi bi-envelope" :value="account?.email" />        
      </div>
      <div :class="`border  font-medium text-sm ${copied? 'dark:border-neutral-950 dark:bg-neutral-50 dark:text-black bg-black text-white' : 'dark:border-neutral-50 dark:bg-neutral-950/50 dark:text-white'} transition-all duration-500 rounded-lg p-2 text-center`" @click="copyAll">
        {{copied ? 'Copiado!' : 'Copiar todos los datos' }}
      </div>
    </div>
    <div class="dark:bg-neutral-950 bg-neutral-50 border-neutral-100 shadow dark:shadow-none text-black p-3 rounded-xl dark:text-neutral-300 text-center text-sm flex flex-col gap-3" v-if="!account_not_found">
      <RouterLink to="/" class="font-bold underline cursor-pointer">
        Registrate aqui
      </RouterLink>
      te equivocaste? registrate de nuevo con el mismo rut
    </div>
    <div class="dark:bg-neutral-950 bg-neutral-50 border-neutral-100 shadow dark:shadow-none text-black p-3 rounded-xl dark:text-neutral-300 text-center text-sm flex flex-col gap-3" v-if="account_not_found">
      Esta cuenta aun no existe. qnta.cl/{{accountName}} puede ser tu link
      <RouterLink to="/" class="font-bold underline cursor-pointer">
        Registrate aqui
      </RouterLink>
    </div>
    <div class="px-5 py-3 gap-5 text-sm">
      Inspirado fuertemente en num.cl <br>
      Hecho por un ser de carne y hueso 🍖.
      Revisa el codigo en <a href="https://github.com/vicholp/qnta">GitHub</a>.
    </div>
  </div>
</template>
<script>

import { BANKS, ACCOUNT_TYPES } from './consts.js';
import { getAccount } from './api.js';
import AccountField from './AccountField.vue';

export default {
  name: "App",
  data() {
    return {
      account: null,
      accountName: this.$route.params.accountName,
      BANKS,
      ACCOUNT_TYPES,
      account_not_found: false,
      copied: false,
    };
  },
  components: {
    AccountField,
  },
  methods: {
    copyAll() {
      const allData = `${this.account.name}
${this.account.rut}
${this.BANKS.find(bank => bank.value === this.account.bank)?.label}
${this.ACCOUNT_TYPES.find(type => type.value === this.account.type)?.label}
${this.account.number}
${this.account.email}`;
      navigator.clipboard.writeText(allData).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
    },
  },
  mounted() {
    getAccount(this.accountName).then((data) => {
      this.account = data.data;
    }).catch((error) => {
      if (error.response && error.response.status === 404) {
        this.account_not_found = true;
      }
    });
  },
};

</script>
