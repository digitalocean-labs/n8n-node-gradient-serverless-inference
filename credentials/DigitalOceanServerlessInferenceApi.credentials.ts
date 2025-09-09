import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class DigitalOceanServerlessInferenceApi implements ICredentialType {
	name = 'digitalOceanServerlessInferenceApi';
	displayName = 'DigitalOcean Gradient™ AI Platform API';
	documentationUrl = 'https://docs.digitalocean.com/products/gradient-ai-platform/how-to/use-serverless-inference/';
	properties: INodeProperties[] = [
		{
			displayName: 'Model Access Key',
			name: 'key',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			}
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.key}}',
			},
		},
	};

	// This block tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://inference.do-ai.run/v1',
			url: '/models',
		},
	};
}
