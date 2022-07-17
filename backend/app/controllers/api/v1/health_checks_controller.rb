class Api::V1::HealthChecksController < ApplicationController
  def index
    head :ok
  end
end
