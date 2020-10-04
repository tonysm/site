<template>
  <div class="font-sans bg-white">
    <!-- Termos de Uso -->
    <section
        class="absolute text-white top-0 bottom-0 left-0 z-40 bg-secondary-button right-0 h-screen overflow-y-scroll mx-auto flex flex-col space-y-6 p-8 text-sm sm:text-lg"
        v-if="!termosDeUso.confirmed"
    >
      <div class="px-2 pb-4">
        <app-logo-light class="block h-10 w-auto mx-auto"/>
      </div>

      <h3 class="text-base text-center font-semibold">Termos de Uso</h3>

      <div class="p-4 text-sm bg-white text-text rounded overflow-hidden overflow-y-scroll"
           :style="{ 'height': '300px' }">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex,
          explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex,
          explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex,
          explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex,
          explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex,
          explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex,
          explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex,
          explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
      </div>
      <form @submit.prevent="confirmTerms()" class="flex flex-col space-y-6">
        <div>
          <app-checkbox v-model="termosDeUso.aceito">Li e aceito os termos de uso.</app-checkbox>
        </div>
        <app-primary-button
            :disabled="termosDeUso.aceito"
            type="submit"
            class="w-full"
        >
          Concordar
        </app-primary-button>
      </form>
    </section>
    <!-- End of Termos de Uso -->

    <!-- Update Candidato -->
    <section
        class="text-text max-w-4xl mx-auto flex flex-col space-y-6 p-8"
        v-if="!atualizado"
    >
      <h3 class="text-base text-center font-semibold">Perfil do Candidato</h3>

      <p class="text-sm">
        Bem-vindo candidato <strong>{{ user.email }}</strong> a sua página no candidatos.info.
        <br>Seu link expira em 24 horas, toda vez que quiser realizar edição de conteúdo, denúncia ou replicar um
        denúncia, digite seu email na seção ”sou um candidato.”
      </p>

      <p class="font-bold">
        Para ter um perfil completo no candidatos.info, adicione ou edite suas informações:
      </p>

      <form @submit.prevent="updateCandidate" class="flex flex-col space-y-6 text-secondary-button">
        <app-text-field
            label="NOME:"
            :value="user.nome"
            :disabled="true"
            id="name"
        />
        <app-text-field
            label="NÚMERO:"
            :value="user.numero"
            :disabled="true"
            link="number"
        />
        <app-text-field
            label="PARTIDO:"
            :value="user.partido"
            :disabled="true"
            id="party"
        />
        <app-text-field
            label="Link para contato (telefone ou URL de rede social):"
            id="link"
            v-model="form.contato.link"
        />
        <app-tags-field
            v-model="form.tags"
            label="PAUTAS-CHAVE:"
            id="tags"
            :options="tags"
            :max="2"
        />
        <app-textarea
            v-model="form.biography"
            label="BIOGRAFIA (MÁX 500 CARACTERES):"
            id="bio"
        />
        <app-textarea
            v-model="form.description"
            label="PROPOSTAS (MÁX 500 CARACTERES):"

        />
        <app-primary-button
            type="submit"
            class="w-full"
            :disabled="enviando"
            :loading="enviando"
        >
          Salvar perfil
        </app-primary-button>
      </form>

      <p class="mt-6 text-xs text-text text-center">
        Você tem denúncias a fazer sobre outro candidato, reclamações ou perguntas sobre o candidatos.info?
        <br>
        <router-link class="underline" to="fale-conosco">Fale conosco</router-link>
      </p>
    </section>
    <!-- End of Update Candidato -->

    <!-- Confirmação -->
    <section
        class="text-text max-w-4xl mx-auto flex flex-col space-y-6 p-8"
        v-if="atualizado"
    >
      <h3 class="text-base text-center font-semibold">Seus dados foram atualizados com sucesso!</h3>

      <app-primary-link-button to="/">Ver meu perfil</app-primary-link-button>
    </section>
    <!-- End Confirmação -->
  </div>
</template>

<script>
import {mapState} from 'vuex';

import AppLogoLight from '@/components/LogoLight.vue';
import AppCheckbox from '@/components/Checkbox.vue';
import AppTextField from '@/components/TextField.vue';
import AppTagsField from '@/components/TagsField.vue';
import AppTextarea from '@/components/TextArea.vue';
import AppPrimaryButton from '@/components/ButtonPrimary.vue';
import AppPrimaryLinkButton from '@/components/ButtonLinkPrimary.vue';
import { ACTION_CREATORS } from "@/store/types";

export default {
  name: 'UpdateCandidato',
  components: {
    AppLogoLight,
    AppCheckbox,
    AppTextField,
    AppTagsField,
    AppTextarea,
    AppPrimaryButton,
    AppPrimaryLinkButton,
  },
  data() {
    return {
      termosDeUso: {
        aceito: false,
        confirmed: true,
      },
      enviando: false,
      atualizado: false,
      user: {
        nome: 'John Doe',
        numero: '55555',
        partido: 'PSOL',
        email: 'john@example.com',
      },
      form: {
        contato: {
          link: '',
          // TODO: Figure out the social network out of the URL?
          social_network: null,
        },
        biography: '',
        description: '',
        tags: []
      }
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tags,
    }),
  },
  methods: {
    confirmTerms() {
      if (!this.termosDeUso.aceito) return;

      this.termosDeUso.confirmed = true;
    },
    updateCandidate() {
      this.enviando = true;

      this.$store.dispatch(ACTION_CREATORS.updateCandidate(this.form))
          .then(() => this.atualizado = true)
          .finally(() => this.enviando = false)
    },
    goToProfile() {
      alert('here');
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>
