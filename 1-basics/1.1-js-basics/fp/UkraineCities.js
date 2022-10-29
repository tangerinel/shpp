'use strict'
function parse(text) {
    let parsedText =
        text.split('\n')
            .filter(str => (/^[^#].+$/g).test(str))
            .map((str) => (
                str = str.split(','),
                {
                    x: str[0],
                    y: str[1],
                    name: str[2],
                    population: str[3]
                })
            )
            .sort((a, b) => b.population - a.population)
            .slice(0, 10)
            .reduce((allCities, str, rating) => {
                rating = rating + 1;
                return {
                    ...allCities, [str.name]: { 'population': str.population, 'rating': rating }
                };
            }, {});
    return (text) => {
        const regex = new RegExp(Object.keys(parsedText).join('|'), 'g');
        return text.replace(
            regex,
            city => `${city}(${parsedText[city]['rating']} место в ТОП-10 самых крупных городов Украины,` +
                `население ${parsedText[city]['population']} человек)`
        )
    };
}


const text = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в этом файле три строки-коммента :)`;
let test = parse(text);
console.log(test(`вона була базою для 70 тисяч повстанців Семена Палія, сім тижнів тут збирав 
військо сам Богдан Хмельницький… Біла Церква пам’ятає Івана Мазепу, провальну облогу Пилипа Орлика.`));

console.log(test(`Перше місто– одне з найстаріших міст давньоруської держави, засноване в 1032 р.
Алушта (крим. Aluşta) — місто в Україні республіканського підпорядкування у складі Автономної
Республіки Крим. Перше місто це Біла Церква`));


