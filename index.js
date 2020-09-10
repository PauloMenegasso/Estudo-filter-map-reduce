//Construção de um elemento de exemplo
const players = [
  {
    name: 'Rafael',
    team: 'Vasco',
    age: 29,
    mass: 60,
  },
  {
    name: 'Felipe',
    team: 'Santos',
    age: 27,
    mass: 70,
  },
  {
    name: 'Jorginho',
    team: 'Grêmio',
    age: 18,
    mass: 75,
  },
  {
    name: 'Michael',
    team: 'Santos',
    age: 16,
    mass: 55,
  },
];
//Executamos aqui um console.log para mostrar que o elementos que criamos está OK
console.log('Todos os elementos do Array');
console.log(players);

//Função FILTER

//Aqui fazemos um filter usando a sua sintase básica:
/*
const newArray = originalArray.filter( () => {} )
onde () => {} é um callback em forma de arrow function 
*/
//a função de callback vai iterar sobre cada elemento do filter (como um 'for'), então 'player' no argumento do exemplo assume valores diferentes para cada interação
console.log('Elementos filtrados com um filter simples (idade < 25):');
const youngPlayers = players.filter((player) => {
  //aqui fazemos o teste lógico desejado para cada jogador (lembrando que o filter é responsável por fazer a interação)
  return player.age < 25;
});
console.log(youngPlayers);

//Podemos fazer de uma forma mais elegante, usando functions
//Esta função recebe dois parâmetros e só retorna o elemento se o primeiro parâmetro for menor que o segundo
const lesserThan = (first, second) => {
  return first < second;
};

//agora vamos chamar o filter
const youngPlayersByFunction = players.filter((player) => {
  return lesserThan(player.age, 25);
});
console.log('Aqui estão os valores filtrados com a função:');
console.log(youngPlayersByFunction);

//Ainda podemos deixar o filter mais elegante fazendo uso do destructuring
//aqui passamos para o filter apenas o conteúdo to campo 'age' de cada player
const youngPlayersByFunctionDestructuring = players.filter(({ age }) => {
  return lesserThan(age, 25);
});
console.log('Aqui estão os valores filtrados com a função e destructuring:');
console.log(youngPlayersByFunctionDestructuring);

//FUNÇÃO MAP
//assim como o filter, este faz a interação em cada elemento do callback, mas retorna um array MODIFICADO com a mesma quantidade de items do array original
// a sintaxe é:
// const newArray = originalArray.map( ()=>{} );

//suponha que desejemos apenas saber o nome de cada jogador
const playerNames = players.map((player) => {
  return player.name;
});
console.log('Array com nomes:');
console.log(playerNames);
//Notem que aqui poderia ser feito um destructuring, passando como argumento do callback {name}, mas vamos deixar as coisas menos complexas por enquanto...

//podemos fazer também podemos alterar valores do array, suponha que um ano tenha se passado desde que os dados foram construídos, assim a idade dos jogadores deve aumentar em um ano.
// Podemos fazer isso facilmente com o auxílio de uma função de incremento e um map.

const increment = (number, increment) => {
  return number + increment;
};
const oneYearAfter = players.map((player) => {
  player.age = increment(player.age, 1);
  //note que aqui não é essencialmente necessário o uso da função. poderíamos usar simplesmente player.age +=, mas isso seria mais hard coded na minha opinião
  return player;
});
//note que nesse map, o destructuring dificultaria as coisas, pois precisamos retornar todo o elemento player, não apenas o player.age para o novo array
console.log('Array com idades aumentadas:');
console.log(oneYearAfter);

//REDUCE
//O reduce é um pouco diferente, ele itera sobre cada elemento do array e retorna UM VALOR. É útil quando você quer trabalhar com estatística, fazendo somas ou medias
//A sintaxe do reduce é quase igual, mas ela tem um parâmetro a mais, que é um valor inicial
/* const reducedArray = originalArray.reduce((total,atual)=>{}, valorInicial) */
//total é o valor que está sendo acumulado, atual é o item que está sendo iterado

//vamos fazer um exemplo para calcular a soma das idades dos jogadores:

const totalAge = players.reduce((total, player) => {
  total += player.age;
  return total;
}, 0);
console.log('idade total dos jogadores:', totalAge);

//a variável total é iniciada com o valor inicial passado como argumento no reduce.
//para mostrar isso, vamos fazer uma conta errada, começando a somar as idades com um valor de 1000 como inicial

const wrongtotalAge = players.reduce((total, player) => {
  total += player.age;
  return total;
}, 1000);
console.log('idade total (errada) dos jogadores:', wrongtotalAge);

//mas a soma das idades por si só não é interessante, como poderíamos calcular uma média?
//para isso precisamos saber de antemão o numero total de jogadores,

const soma = players.reduce((total, player) => {
  total += player.age;
  return total;
}, 0);
const number = players.length;
const mean = soma / number;
console.log('A média de idades dos jogadores é:', mean);
//note que a media é feita fora do reduce. Poderíamos fazer dentro.
// se fizermos com a divisão diretamente dentro do reduce, note que o resultado estará errado:
const wrongMean = players.reduce((total, player) => {
  total += player.age;
  return total / players.length;
}, 0);
console.log('A média (errada) de idades dos jogadores é:', wrongMean);
//isso ocorre pois cada 'passo' pelo reduce é iterado. Sendo assim, estamos dividindo cada valor total obtido por players.length, o que gera um resultado incorreto

//O reduce também pode retornar um objeto, vamos supor que na mesma função queiramos calcular a media das idades e massas:
const sumAgeAndMass = players.reduce(
  (total, player) => {
    //nesse caso devemos retornar os valores como um objeto
    return {
      totalAge: (total.totalAge += player.age),
      totalMass: (total.totalMass += player.mass),
    };
  },
  { totalAge: 0, totalMass: 0 }
);
console.log('Assim, ja temos as idades e massas totais: ', sumAgeAndMass);

//para descobrir a media, vamos usar uma função:
function calculaMedia(soma, numeroDeElementos) {
  return soma / numeroDeElementos;
}

const meanAge = calculaMedia(sumAgeAndMass.totalAge, players.length);
const meanMass = calculaMedia(sumAgeAndMass.totalMass, players.length);
console.log('Assim, ja temos as médias: ', meanAge, meanMass);

//Mas suponhamos que queremos saber a soma das idades apenas dos jogadores do Santos. Podemos fazer isso usando um filter, para retornar um array apenas com jogadores deste clube e depois um reduce, para calcular a soma das idades.

const santosPlayers = players.filter((player) => {
  if (player.team === 'Santos') return player;
});
console.log('Vemos que aqui só tem jogadores do Santos:');
console.log(santosPlayers);
//agora fazemos o reduce:
const santosPlayersTotalAge = santosPlayers.reduce((total, player) => {
  return (total += player.age);
}, 0);
console.log('Total de idades dos jogadores do Santos:', santosPlayersTotalAge);

//mas tem um jeito mais inteligente de fazer isso, que é encadiando o reduce depois do filter:

const santosPlayersAge = players
  .filter((player) => {
    if (player.team === 'Santos') return player;
  })
  .reduce((total, player) => {
    return (total += player.age);
  }, 0);
console.log(
  'Total de idades dos jogadores do Santos (encadeando):',
  santosPlayersAge
);
