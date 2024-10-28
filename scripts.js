// Constantes com o botão de upload e o input oculto para imagem.
const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

// Ouvinte de evento pro clique do botão, que chama um click no input
uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

// Declaração da função que vai ler o conteúdo de um arquivo
function lerConteudoDoArquivo(arquivo) {

    // Retorna uma nova Promise que encapsula o processo de leitura do arquivo, resolve caso a operação seja bem sucedida, reject caso fracasse.
    return new Promise((resolve, reject) => {
        
        // Cria uma nova instância de FileReader, que é responsável por ler o arquivo
        const leitor = new FileReader();

        // Define o que acontece quando o leitor terminar de ler o arquivo com sucesso
        leitor.onload = () => {
            // Chama resolve para indicar que a leitura foi bem-sucedida
            // Retorna um objeto com a URL do conteúdo do arquivo (leitor.result) e o nome do arquivo (arquivo.name)
            resolve({ url: leitor.result, nome: arquivo.name });
        };

        // Define o que acontece se houver um erro durante a leitura do arquivo
        leitor.onerror = () => {
            // Chama reject para indicar que houve um erro e passa uma mensagem de erro que inclui o nome do arquivo
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        };

        // Inicia a leitura do arquivo e converte seu conteúdo em uma Data URL, isso gera uma string base64 que representa o conteúdo do arquivo
        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector('.main-imagem');
const nomeDaImagem = document.querySelector('.container-image-nome p');

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        } catch (erro) {
            console.error('Erro na leitura do arquivo');
        }
    };
})

