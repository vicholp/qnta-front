<template>
  <div class="pt-5 px-2 max-w-xl mx-auto flex flex-col gap-10">
    <div :class="`${angle} from-indigo-500 to-violet-500 dark:from-indigo-600 dark:to-violet-600 rounded-xl ${account_not_found ? 'opacity-40' : ''}`">
      <div :class="`bg-[url(${pattern})]`">
          <div :class="` p-5 rounded-xl flex flex-col gap-5 shadow-xl shadow-violet-300 dark:shadow-violet-950 dark:shadow-lg text-[#e2e2e2] font-semibold`">
            <div class="flex justify-end">
              <div class="text-lg pr-2 text-white/50">
              qnta
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <AccountField icon="mdi:account" :value="account?.name" :loading="loading" :copy="!account_not_found" />
            <AccountField icon="mdi:identification-card-outline" :value="account?.rut" :loading="loading" :copy="!account_not_found" />
            <AccountField icon="mdi:bank" :value="account ? BANKS.find(bank => bank.value === account.bank)?.label : ''" :loading="loading" :copy="!account_not_found" />
            <AccountField icon="mdi:account-balance-wallet-outline" :value="account ? ACCOUNT_TYPES.find(type => type.value === account.type)?.label : ''" :loading="loading" :copy="!account_not_found" />
            <AccountField icon="mdi:credit-card-chip-outline" :value="account?.number" :loading="loading" :copy="!account_not_found" />
            <AccountField icon="mdi:alternate-email" :value="account?.email" :loading="loading" :copy="!account_not_found" />        
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loading && !account_not_found" :class="`border font-medium text-sm ${copied? 'dark:border-neutral-950 dark:bg-neutral-50 dark:text-black bg-white text-black' : 'dark:border-neutral-50 dark:bg-neutral-950/90 dark:text-white bg-black text-white'} transition-all duration-500 rounded-lg p-2 text-center`" @click="copyAll">
      {{copied ? 'Copiado!' : 'Copiar todos los datos' }}
    </div>
    <div class="border-neutral-200 border dark:border-neutral-900 dark:border text-black p-3 rounded-xl dark:text-neutral-300 text-center text-sm flex flex-col gap-3" v-if="!account_not_found">
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
    <div class="px-5 py-3 gap-5 text-sm text-neutral-700 dark:text-neutral-600">
      Inspirado fuertemente en num.cl <br>
      Hecho por seres de carne y hueso 🍖.
      Revisa el codigo en <a href="https://github.com/vicholp/qnta">GitHub</a>.
    </div>
  </div>
</template>
<script>

import { BANKS, ACCOUNT_TYPES } from './consts.js';
import { getAccount } from './api.js';
import AccountField from './AccountField.vue';
import toph from './toph.svg';
import textureSvg from './texture.svg';
import cageSvg from './cage.svg';
import circuitSvg from './circuit.svg';

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
      loading: true,
    };
  },
  components: {
    AccountField,
  },
  computed: {
    angle() {
      return `bg-linear-${this.getHash % 360}`;
    },
    pattern() {
      const patterns = ['toph.svg', 'texture.svg', 'cage.svg', 'circuit.svg'];
      return patterns[this.getHash  % patterns.length];
    },
    getHash() { 
      const string = this.accountName || '';

      let hash = 0;
      for (const char of string) {
        hash = (hash << 5) - hash + char.charCodeAt(0);
        hash |= 0;
      }
      console.log(hash);

      return Math.abs(hash) ;
    },
    formatRut(){

    }

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
      this.loading = false;
    }).catch((error) => {
      if (error.response && error.response.status === 404) {
        this.account_not_found = true;
        this.loading = false;
      }
    });
  },
};

</script>
