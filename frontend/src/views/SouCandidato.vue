<template>
  <div class="font-sans leading-loose">
    <!-- Sou um Candidato -->
    <div v-if="!showSuccess">
      <section class="max-w-4xl mx-auto flex flex-col space-y-6 p-8 text-sm sm:text-lg text-text">
        <h3 class="text-xl text-center font-semibold">Sou um Candidato</h3>

        <p>
          Bem-vindo a seção do Candidatos.info dedicada ao cadastro, edição de conteúdo e envio de denúncia de candidatos.
        </p>

        <p>
          Se você também quer ter visibilidade para mostrar suas propostas e aumentar seu alcance na próxima eleição, cadastre-se usando seu email oficial cadastrado no TSE.
        </p>

        <p>
          Precisa editar seu perfil, abrir ou replicar uma denúncia?
        </p>

        <div>
          <form @submit.prevent="sendRequest" class="flex flex-col space-y-3">
            <app-text-field
                v-model="form.email"
                type="email"
                placeholder="digite aqui seu e-email oficial"
            />

            <app-primary-button
                :class="{'bg-disabled-button': !form.email, 'bg-primary-button': form.email}"
                :disabled="!form.email || sending"
                :loading="sending"
                type="submit"
            >Enviar</app-primary-button>
          </form>
        </div>
      </section>
    </div>
    <div v-if="showSuccess">
      <section class="max-w-4xl mx-auto flex flex-col p-8 pt-16 text-sm sm:text-lg text-text">
        <p>
          Uma confirmação foi enviada para seu e-mail <strong>{{ form.email }}</strong> para que você possa prosseguir com sua ação.
        </p>
      </section>
    </div>
    <!-- End of Sou um Candidato -->
  </div>
</template>

<script>
import AppTextField from '@/components/TextField.vue';
import AppPrimaryButton from '@/components/ButtonPrimary.vue';
import { ACTION_CREATORS } from '@/store/types';

export default {
  name: "SouCandidato",
  components: {
    AppPrimaryButton,
    AppTextField,
  },
  data() {
    return {
      sending: false,
      showSuccess: false,
      form: {
        email: '',
      },
    }
  },
  methods: {
    sendRequest() {
      this.sending = true;

      this.$store.dispatch(ACTION_CREATORS.requestAccess(this.form.email))
        .then(() => {
          this.showSuccess = true;
        })
        .finally(() => this.sending = false);
    }
  }
}
</script>
