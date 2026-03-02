---
name: superprompter-pedagogique
description: Améliore un prompt simple pour la création de contenu pédagogique en un prompt avancé et détaillé. Utiliser pour transformer une idée de cours ou de leçon en un prompt structuré suivant la méthode ROC (Rôle, Objectif, Contrainte) pour une IA générative.
license: Complete terms in LICENSE.txt
---

# SuperPrompter Pédagogique

Ce skill transforme un prompt de base fourni par l'utilisateur en un prompt "ULTRA-amélioré" destiné à une IA générative pour créer du contenu pédagogique de haute qualité. Il suit la méthode **ROC (Rôle, Objectif, Contraintes)**.

## Processus

Lorsque l'utilisateur fournit un prompt simple pour la création de contenu pédagogique (par exemple, "créer un cours sur la gestion du temps"), suis les étapes ci-dessous pour générer le prompt amélioré.

### Étape 1 : Analyser la demande initiale

Identifie le sujet principal du contenu à créer à partir du prompt de l'utilisateur.

- **Prompt utilisateur :** `{{user_prompt}}`
- **Sujet identifié :** [Insérer le sujet ici]

### Étape 2 : Construire le prompt amélioré avec la méthode ROC

Utilise la structure suivante pour construire le nouveau prompt. Personnalise chaque section en fonction du sujet identifié.

#### **R - Rôle**

Définis un rôle d'expert pour l'IA. Ce rôle doit être précis et en adéquation avec le sujet pédagogique.

> **Exemple de Rôle :**
> "Tu es un ingénieur pédagogique expert, spécialisé dans la conception de formations professionnelles engageantes et efficaces. Tu maîtrises les principes de l'andragogie et les techniques de communication pour adultes. Tu as 15 ans d'expérience dans la création de contenu pour des organismes de formation certifiés Qualiopi."

#### **O - Objectif**

Formule l'objectif final de manière claire et détaillée. Précise le public cible, le résultat attendu et le niveau de détail.

> **Exemple d'Objectif :**
> "Ton objectif est de rédiger un support de cours complet et détaillé sur **[Sujet identifié]**, destiné à des professionnels en reconversion. Le contenu doit être structuré, facile à comprendre, et directement applicable dans un contexte professionnel. Le résultat final doit être un document Word (.docx) d'environ 10 pages, prêt à être distribué aux apprenants."

#### **C - Contraintes**

Liste toutes les règles, les formats, le ton, la structure et les éléments à inclure ou à exclure. Sois très spécifique.

> **Exemple de Contraintes :**
> "**Structure du document :**
> 1.  **Introduction :** Accroche, présentation du sujet et des objectifs pédagogiques.
> 2.  **Partie 1 - Les concepts fondamentaux :** Définitions, théories clés, et exemples.
> 3.  **Partie 2 - Méthodes et outils :** Présentation d'au moins 3 méthodes pratiques avec des études de cas.
> 4.  **Partie 3 - Mise en application :** Un exercice pratique guidé pas à pas.
> 5.  **Conclusion :** Résumé des points clés et ouverture vers des sujets connexes.
>
> **Ton et Style :**
> - Adopte un ton professionnel, expert, mais bienveillant et encourageant.
> - Utilise le langage 'Facile à Lire et à Comprendre' (FALC).
> - Évite le jargon technique ou explique-le systématiquement.
>
> **Formatage :**
> - Utilise des titres et des sous-titres clairs (H1, H2, H3).
> - Intègre au moins un tableau récapitulatif.
> - Mets les termes importants en **gras**.
>
> **Contenu à inclure :**
> - Fais référence à au moins deux sources académiques ou publications reconnues sur le sujet.
> - Propose des exemples concrets et variés.
>
> **Contenu à exclure :**
> - Ne fais aucune auto-promotion.
> - N'inclus pas de section 'Pour aller plus loin'."

### Étape 3 : Assembler et livrer le prompt final

Combine les trois parties (Rôle, Objectif, Contraintes) en un seul bloc de texte. Ce bloc constitue le prompt ULTRA-amélioré à fournir à l'utilisateur ou à utiliser directement dans une IA générative.

**Exemple de livraison :**

"Voici un prompt ULTRA-amélioré, basé sur votre demande, prêt à être utilisé avec une IA générative pour créer votre contenu pédagogique :"

```
[Coller ici le prompt assemblé R + O + C]
```
