class RecintosZoo {
    constructor() {

        // Defina os recintos existentes com suas informações
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['MACACO', 'MACACO', 'MACACO'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana', tamanhoTotal: 7, animais: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['LEAO'] }
        ];

        // Defina as espécies permitidas e seus tamanhos
        this.especies = {
            LEAO: 3,
            LEOPARDO: 2,
            CROCODILO: 3,
            MACACO: 1,
            GAZELA: 2,
            HIPOPOTAMO: 4
        };
    }

    validaEntrada(tipoAnimal, quantidade) {
        // Verifica se o tipo de animal é válido
        if (!this.especies[tipoAnimal]) {
            return { erro: 'Animal inválido' };
        }

        // Verifica se a quantidade é um número positivo
        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        return null; // Dados de entrada válidos
    }

    analisaRecintos(tipoAnimal, quantidade) {
        const validacao = this.validaEntrada(tipoAnimal, quantidade);
        if (validacao) {
            return validacao;
        }

        // Lógica para encontrar recintos adequados
        const recintosViaveis = this.recintos
            .filter((recinto) => {
                // Calcula o espaço livre após a inclusão do animal
                const espacoLivre = recinto.tamanhoTotal - recinto.animais.length * this.especies[tipoAnimal];
                return espacoLivre >= quantidade;
            })
            .map((recinto) => `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - recinto.animais.length *( this.especies[tipoAnimal])} total: ${recinto.tamanhoTotal})`);

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto possível' };
        }

        return { recintosViaveis };
    }
}

// Exemplo de uso
const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 4);
console.log(resultado);
export { RecintosZoo as RecintosZoo };