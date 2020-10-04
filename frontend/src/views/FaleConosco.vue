<template>
  <div class="font-sans leading-loose">
    <!-- Fale Conosco -->
    <section class="max-w-4xl mx-auto flex flex-col space-y-6 p-8 text-sm sm:text-lg bg-secondary-button text-flux-candidate" v-if="!sent">
      <h3 class="text-base text-center font-semibold">Fale conosco</h3>

      <form @submit.prevent="sendMessage" class="flex flex-col space-y-6">
        <app-select-field
            id="tags"
            label="Tipo"
            v-model="form.type"
            :options="options"
        />

        <app-text-field
            id="subject"
            label="Assunto"
            v-model="form.subject"
        />

        <app-textarea
            id="description"
            label="Descrição (MÁX 500 CARACTERES)"
            v-model="form.description"
        />

        <app-primary-button
            :disabled="!filled || sending"
            :loading="sending"
            type="submit"
        >Enviar
        </app-primary-button>
      </form>
    </section>
    <!-- End of Fale Conosco -->

    <!-- Message Sent -->
    <section class="max-w-4xl mx-auto flex flex-col space-y-6 p-8 text-sm sm:text-lg" v-if="sent">
      <h3 class="text-base text-center font-semibold">Obrigado pelo contato. Sua mensagem foi enviada com sucesso!</h3>

      <app-primary-button-link to="/">Ver meu perfil</app-primary-button-link>
    </section>
    <!-- End of Message Sent -->
  </div>
</template>

<script>
import AppSelectField from '@/components/SelectField.vue';
import AppTextField from '@/components/TextField.vue';
import AppTextarea from '@/components/TextArea.vue';
import AppPrimaryButton from '@/components/ButtonPrimary.vue';
import AppPrimaryButtonLink from '@/components/ButtonLinkPrimary.vue';
import {ACTION_CREATORS} from "@/store/types";

export default {
  name: 'FaleConosco',
  components: {
    AppSelectField,
    AppTextField,
    AppTextarea,
    AppPrimaryButton,
    AppPrimaryButtonLink,
  },
  computed: {
    options: () => ['Sugestão', 'Reclamação', 'Denúncia', 'Pergunta'],
    filled() {
      return this.form.type
          && this.form.subject
          && this.form.description && this.form.description.length < 500;
    }
  },
  data() {
    return {
      sending: false,
      sent: false,
      form: {
        type: '',
        subject: '',
        description: '',
      },
    }
  },
  methods: {
    sendMessage() {
      this.sending = true;

      this.$store.dispatch(ACTION_CREATORS.sendMessage(this.form))
          .then(() => this.sent = true)
          .finally(() => this.sending = false)
    }
  },
}
</script>
