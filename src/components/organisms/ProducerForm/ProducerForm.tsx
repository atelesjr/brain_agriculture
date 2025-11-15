import { ProducerForm } from './ProducerForm.styles';

const ProducerFormComponent = () => {
	return (
		<ProducerForm>
			<h2>Formulário de Produtor</h2>

			<section>
				<div className="label">Documento: (CPF/CNPJ)</div>
				<div className="label">Nome do produtor</div>
				<div className="label">Nome da propriedade:</div>
				<div className="label">Cidade</div>
				<div className="label">Estado</div>
				<div className="label">Área total da fazenda (em hectares)</div>
				<div className="label">Área agricultável (em hectares)</div>
				<div className="label">Área de vegetação (em hectares)</div>

				<div className="label">Safras (ex: Safra 2021, Safra 2022)</div>
				<div className="label">
					Culturas plantadas (ex.: Soja na Safra 2021, Milho na Safra 2021, Café na Safra 2022)
				</div>
			</section>
		</ProducerForm>
	);
};

export default ProducerFormComponent;
