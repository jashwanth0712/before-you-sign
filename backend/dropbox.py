from pprint import pprint
from dropbox_sign import ApiClient, ApiException, Configuration, apis, models

def send_signature_request(api_key, signers, cc_email_addresses, files, metadata, test_mode=True,
                           title="", subject="", message=""):
    configuration = Configuration(
        username=api_key,
    )

    with ApiClient(configuration) as api_client:
        signature_request_api = apis.SignatureRequestApi(api_client)

        signing_options = models.SubSigningOptions(
            draw=True,
            type=True,
            upload=True,
            phone=True,
            default_type="draw",
        )

        field_options = models.SubFieldOptions(
            date_format="DD - MM - YYYY",
        )

        data = models.SignatureRequestSendRequest(
            title=title,
            subject=subject,
            message=message,
            signers=signers,
            cc_email_addresses=cc_email_addresses,
            files=files,
            metadata=metadata,
            signing_options=signing_options,
            field_options=field_options,
            test_mode=test_mode,
        )

        try:
            response = signature_request_api.signature_request_send(data)
            pprint(response)
        except ApiException as e:
            print("Exception when calling Dropbox Sign API: %s\n" % e)
