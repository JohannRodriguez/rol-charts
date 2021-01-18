module Api
  module V1
    class CharactersController < ApplicationController
      include CurrentUserConcern

      def index
        characters = User.all.collect(&:name)
        render json: characters
      end

      def create
        character = @current_user.characters.new(character_params)

        if character.save
          render json: { status: 'SUCCESS' }
        else
          render json: { status: 'FAILURE', error: character.errors }
        end
      end

      def update
        
      end

      def destroy
        
      end

      private

      def character_params
        params.require(:character).permit(:name, :bio, :universe)
      end
    end
  end
end