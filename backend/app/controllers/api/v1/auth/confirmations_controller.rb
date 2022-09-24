class Api::V1::Auth::ConfirmationsController < DeviseTokenAuth::ConfirmationsController
  def show
    @resource = resource_class.confirm_by_token(resource_params[:confirmation_token])

    if @resource.errors.empty?
      yield @resource if block_given?

      @token = @resource.create_token
      @resource.save!

      render json: {
        data: resource_data(resource_json: @resource.token_validation_response),
        status: 'success'
      }
    else
      raise ActionController::RoutingError, 'Not Found'
    end
  end
end
