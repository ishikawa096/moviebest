class RemoveNumberedFromLists < ActiveRecord::Migration[6.1]
  def change
    remove_column :lists, :numbered, :boolean
  end
end
