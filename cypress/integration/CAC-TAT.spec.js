describe('Central de Atendimento ao Cliente TAT', ()=>{

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(()=>{
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', ()=>{
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche obrigatórios e envia formulário', ()=>{
        cy.clock()

        cy.get('input[id="firstName"]').type('First')
        cy.get('input[id="lastName"]').type('Last')
        cy.get('input[id="email"]').type('first@mail.com')
        cy.get('textarea[id="open-text-area"]').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('span[class="success"]').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span[class="success"]').should('be.not.visible')
    })

    it('preenche obrigatórios com get do cypress', ()=>{
        cy.clock()

        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')
        cy.get('#email').type('email@mail.com')
        cy.get('#open-text-area').type('Open text area')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('be.not.visible')
    })

    it('preenche obrigatórios com get do cypress long text', ()=>{
        const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, "+
                         "teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, "+
                         " teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste."

        cy.clock()

        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')
        cy.get('#email').type('email@mail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })


    Cypress._.times(5, ()=>{
    it('mensagem de erro email formato inválido', ()=>{
            cy.clock()

            cy.get('#firstName').type('First')
            cy.get('#lastName').type('Last')
            cy.get('#email').type('email@teste,com')
            cy.get('#open-text-area').type('Teste')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')

            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })
    })
    it('validar se campo telefone só aceita números', ()=>{
        cy.get('#phone')
        .type('escrevendo no campo telefone')
        .should('be.empty')
})
   

    it('mensagem de telefone obrigatório', ()=>{

        cy.clock()

        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')
        cy.get('#email').type('first@mail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('validar texto de subtítulo', ()=>{
        cy.get('#subtitle').should('have.text', 'Forneça o máximo de informações, por favor.')
    })

    it('preenche e limpa campos obrigatórios', ()=>{
        cy.get('#firstName').type('First')
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').type('Last')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').type('first@mail.com')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#open-text-area').type('Teste')
        cy.get('#open-text-area').clear().should('have.value', '')
    })

    it('mensagem de erro ao enviar formulário sem preenchimento',()=>{
        cy.clock()
        
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy. tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('envia formulário com sucesso com comando customizado', ()=>{
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('contains', ()=>{
        cy.clock()
        
        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')
        cy.get('#email').type('email@mail.com')
        cy.get('#open-text-area').type('Open text area')
        cy.contains('button', 'Enviar').click()   
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) com seu texto', ()=>{
        cy.clock()

        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')
        cy.get('#email').type('email@email.com')
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
        cy.get('#open-text-area').type('Text Area')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('seleciona produto (Mentoria) por seu valor', ()=>{
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona produto (Blog) por seu índice', ()=>{
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('selecionando o tipo de atendimento Feedback', ()=>{
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('selecionando o tipo de atendimento Ajuda', ()=>{
        cy.get('input[type="radio"][value="ajuda"]')
        .check()
        .should('be.checked')
    })

    it('selecionando o tipo de atendimento Elogio', ()=>{
        cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should('be.checked')
    })

    it('marcando todos os radio button', ()=>{
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
        cy.get('input[type="radio"][value="ajuda"]')
            .check()
            .should('be.checked')
        cy.get('input[type="radio"][value="elogio"]')
            .check()
            .should('be.checked')
    })

    it('marcando cada tipo de atendimento curso', ()=>{
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos check e depois desmarca o último', ()=>{
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('adicionando anexo da pasta fixtures', ()=>{
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', ()=>{
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', ()=>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
    })

    it('verifica a abertura do link política de privacidade em outra aba sem a necessidade de um clique', ()=>{
        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })

    it('acessa página de política de privacidade removendo o target e clicando no link', ()=>{
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        .get('#title')
        .should('have.text', 'CAC TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', ()=>{
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')    
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche area de texto com comando invoke', ()=>{

        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })

    it('faz uma requisição HTTP', ()=>{
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((response)=>{
            console.log(response)
            const{ status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })

    it.only('mostra o gato escondido', ()=>{
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
        cy.get('#title')
        .invoke('text', 'CAT TAT')
        .should('have.text', 'CAT TAT')
        cy.get('#subtitle')
        .invoke('text', 'Eu 🖤 gatos')
        .should('have.text', 'Eu 🖤 gatos')
    })
})