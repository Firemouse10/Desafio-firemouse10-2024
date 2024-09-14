class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['macaco', 'macaco', 'macaco'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: ['gazela'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['leao'] }
        ];

        this.animais = {
            'leao': { tamanho: 3, bioma: 'savana', carnivoro: true },
            'leopardo': { tamanho: 2, bioma: 'savana', carnivoro: true },
            'crocodilo': { tamanho: 3, bioma: 'rio', carnivoro: true },
            'macaco': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'gazela': { tamanho: 2, bioma: 'savana', carnivoro: false },
            'hipopotamo': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        animal = animal.toLowerCase();
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }

        const animalInfo = this.animais[animal];
        const recintosViaveis = this.recintos.filter(recinto => {
            const tamanhoDisponivel = recinto.tamanhoTotal - this.getEspacoOcupado(recinto);
            const biomaCompatível = Array.isArray(animalInfo.bioma)
                ? animalInfo.bioma.includes(recinto.bioma)
                : animalInfo.bioma === recinto.bioma;

            // Verifica se o recinto é compatível
            if (!biomaCompatível || tamanhoDisponivel < quantidade * animalInfo.tamanho) {
                return false;
            }

            // Verifica se há animais carnívoros presentes
            if (animalInfo.carnivoro && recinto.animais.some(a => this.animais[a].carnivoro && a !== animal)) {
                return false;
            }

            // Verifica a condição especial para o 'macaco'
            if (animal === 'macaco' && quantidade === 1 && recinto.animais.length === 0) {
                return false;
            }

            return true;
        }).map(recinto => ({
            numero: recinto.numero,
            espacoLivre: recinto.tamanhoTotal - this.getEspacoOcupado(recinto) - quantidade * animalInfo.tamanho,
            tamanhoTotal: recinto.tamanhoTotal
        }));

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return {
            recintosViaveis: recintosViaveis
                .sort((a, b) => a.numero - b.numero)
                .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanhoTotal})`)
        };
    }

    getEspacoOcupado(recinto) {
        return recinto.animais.reduce((total, animal) => total + this.animais[animal].tamanho, 0);
    }
}

export { RecintosZoo };