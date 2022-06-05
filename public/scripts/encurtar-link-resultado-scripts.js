$('#copiarLink').on('click',function(){
    try{
        var txt = $('#linkEncurtado').attr('href');
        navigator.clipboard.writeText(txt);
        alert("Copied the text: " + txt);
    } catch {
        console.log('Erro: Não foi possível copiar o link encurtado')
    }
});