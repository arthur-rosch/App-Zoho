export function getEmailDuplicate(recordArray) {
    const countEmail = {};
    const registrationWithDuplicateEmail = [];
    
    // Itera sobre cada objeto no array
    recordArray.forEach(record => {
        const email = record.Email;
    
        // Se o email já foi encontrado, incrementa a contagem
        if (countEmail[email]) {
        countEmail[email]++;
        // Adiciona o objeto ao array se ainda não estiver presente
        if (!registrationWithDuplicateEmail.includes(record)) {
            registrationWithDuplicateEmail.push(record);
        }
        } else {
        // Se o email ainda não foi encontrado, inicializa a contagem
        countEmail[email] = 1;
        }
    });
    
    // Filtra os objetos que têm emails repetidos
    const objectsDuplicate = registrationWithDuplicateEmail.filter(objeto =>
        countEmail[objeto.Email] > 1
    );

    
    return registrationWithDuplicateEmail
}