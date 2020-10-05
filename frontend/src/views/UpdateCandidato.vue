<template>
  <div class="font-sans bg-white">
    <!-- Termos de Uso -->
    <section
        class="absolute text-white top-0 bottom-0 left-0 z-40 bg-secondary-button right-0 h-screen overflow-y-scroll mx-auto flex flex-col space-y-6 p-8 text-sm sm:text-lg"
        v-if="!termosDeUso.aceito"
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
        <app-primary-button
            type="submit"
            class="w-full"
        >
          Concordar
        </app-primary-button>
      </form>
    </section>
    <!-- End of Termos de Uso -->

    <div v-else>
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
          <app-textarea
              v-model="form.biography"
              label="BIOGRAFIA (MÁX 500 CARACTERES):"
              id="bio"
          />
          <app-tags-autocomplete-field
              v-model="form.tags"
              label="PAUTAS-CHAVE:"
              id="tags"
              :options="tags"
              :max="2"
          />
          <app-textarea
              v-for="description in form.descriptions"
              :key="description.tag"
              v-model="description.description"
              :label="`PROPOSTAS SOBRE ${description.tag.toUpperCase()} (MÁX 200 CARACTERES):`"
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
  </div>
</template>

<script>
import {mapState} from 'vuex';

import AppLogoLight from '@/components/LogoLight.vue';
import AppTextField from '@/components/TextField.vue';
import AppTagsAutocompleteField from '@/components/TagsAutocompleteField.vue';
import AppTextarea from '@/components/TextArea.vue';
import AppPrimaryButton from '@/components/ButtonPrimary.vue';
import AppPrimaryLinkButton from '@/components/ButtonLinkPrimary.vue';
import { ACTION_CREATORS } from "@/store/types";

export default {
  name: 'UpdateCandidato',
  components: {
    AppLogoLight,
    AppTextField,
    AppTagsAutocompleteField,
    AppTextarea,
    AppPrimaryButton,
    AppPrimaryLinkButton,
  },
  data() {
    return {
      termosDeUso: {
        aceito: false,
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
        descriptions: [],
        tags: [],
      }
    }
  },
  watch: {
    'form.tags' (newTags, oldTags) {
      const adding = newTags.length > oldTags.length;

      if (adding) {
        this.form.descriptions.push({
          tag: newTags[newTags.length - 1],
          description: '',
        });
      } else {
        const missingTag = oldTags.find(tag => ! newTags.includes(tag));
        const index = this.form.descriptions.findIndex(({ tag }) => tag == missingTag);

        if (index !== -1) {
          this.form.descriptions.splice(index, 1);
        }
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
      this.termosDeUso.aceito = true;
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
