$(document).on('change','#checkSenha',function(){
    try{
        if(this.checked){
            $("#fieldSenha").show();
        } else {
            $("#fieldSenha").hide();
        }
    } catch {
        console.log('Erro: Não foi possível alterar exibição do fieldSenha')
    }
});