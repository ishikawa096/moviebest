class Api::V1::HealthChecksController < ApplicationController
  skip_before_action :authenticate
  def index
    head :ok
  end
end
